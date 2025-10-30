const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('=================================');
console.log('  ĐỔI MẬT KHẨU ADMIN');
console.log('=================================\n');

rl.question('Nhập mật khẩu mới: ', (password) => {
    if (!password || password.length < 6) {
        console.error('❌ Mật khẩu phải có ít nhất 6 ký tự!');
        rl.close();
        return;
    }

    rl.question('Xác nhận mật khẩu: ', (confirmPassword) => {
        if (password !== confirmPassword) {
            console.error('❌ Mật khẩu xác nhận không khớp!');
            rl.close();
            return;
        }

        console.log('\n⏳ Đang tạo hash...');

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('❌ Lỗi khi tạo hash:', err);
                rl.close();
                return;
            }

            console.log('\n✅ Hash đã được tạo thành công!');
            console.log('Hash:', hash);

            // Update .env.local file
            const envPath = path.join(__dirname, '..', '.env.local');

            try {
                let envContent = '';

                if (fs.existsSync(envPath)) {
                    envContent = fs.readFileSync(envPath, 'utf8');

                    // Replace existing hash
                    if (envContent.includes('ADMIN_PASSWORD_HASH=')) {
                        envContent = envContent.replace(
                            /ADMIN_PASSWORD_HASH=.*/,
                            `ADMIN_PASSWORD_HASH=${hash}`
                        );
                    } else {
                        // Add hash if not exists
                        envContent += `\nADMIN_PASSWORD_HASH=${hash}\n`;
                    }
                } else {
                    // Create new .env.local
                    envContent = `# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=${hash}

# JWT Secret (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Session Settings
SESSION_MAX_AGE=86400
`;
                }

                fs.writeFileSync(envPath, envContent);

                console.log('\n✅ File .env.local đã được cập nhật!');

                // Update code file automatically
                try {
                    const codePath = path.join(__dirname, '..', 'src', 'app', 'api', 'auth', 'login', 'route.ts');
                    let codeContent = fs.readFileSync(codePath, 'utf8');

                    // Replace hash in code
                    const hashRegex = /const ADMIN_PASSWORD_HASH = '[^']+'; \/\/ .*/;
                    const newHashLine = `const ADMIN_PASSWORD_HASH = '${hash}'; // ${password}`;

                    if (hashRegex.test(codeContent)) {
                        codeContent = codeContent.replace(hashRegex, newHashLine);
                        fs.writeFileSync(codePath, codeContent);
                        console.log('✅ File login/route.ts đã được cập nhật tự động!');
                    }
                } catch (codeError) {
                    console.log('⚠️  Không thể tự động cập nhật code');
                }

                console.log('\n📝 Mật khẩu mới của bạn:', password);
                console.log('📝 Hash:', hash);
                console.log('\n✨ Next.js sẽ tự động reload, không cần restart!');
                console.log('   Đợi 2-3 giây rồi thử đăng nhập với mật khẩu mới\n');

            } catch (error) {
                console.error('❌ Lỗi khi cập nhật .env.local:', error);
                console.log('\n📋 Vui lòng copy hash trên và paste vào file thủ công');
            }

            rl.close();
        });
    });
});
