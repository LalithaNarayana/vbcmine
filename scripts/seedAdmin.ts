import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@vbc.com";
const ADMIN_PASSWORD = "VBConfiber@321";

async function seedAdmin() {
  // Dynamic imports so they only load AFTER dotenv.config() has run
  const { default: connectDB } = await import("../src/lib/mongodb");
  const { default: Admin } = await import("../src/models/Admin");

  const email = ADMIN_EMAIL;
  const password = ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in the script.");
    process.exit(1);
  }

  await connectDB();

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`Admin with email "${email}" already exists. Skipping.`);
    process.exit(0);
  }

  const admin = await Admin.create({
    email,
    password, // hashed automatically by the pre-save hook
    name: "Admin",
  });

  console.log(`✅ Admin user created: ${admin.email}`);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});