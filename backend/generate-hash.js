const bcrypt = require('bcryptjs');

async function generateHashes() {
  console.log('\n🔐 Generating Correct Bcrypt Hashes...\n');
  
  const passwords = {
    'admin123': 'Admin Password',
    'teacher123': 'Teacher Password',
    'parent123': 'Parent Password'
  };
  
  for (const [password, label] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${label}:`);
    console.log(`  Password: ${password}`);
    console.log(`  Hash: ${hash}\n`);
  }
  
  process.exit(0);
}

generateHashes();
