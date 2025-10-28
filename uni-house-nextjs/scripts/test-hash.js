const bcrypt = require('bcryptjs');

const password = '123456';
const hash = '$2b$10$ZFDj263Ek9geugrrUUN5H.n4UD5D2GT/BOlKibAH7Rh7WljxWM7tO';

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Password matches:', result);
});
