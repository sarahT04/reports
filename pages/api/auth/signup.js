import { ADMIN_SECRET_KEY, SECRET_KEY } from '../../../utils/constants';
import { hashPassword, connectToDatabase } from '../../../utils/utils';

async function signUpCoach(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Get body data
  let isAdmin = false;
  const data = req.body;
  const { username, password, name, secretKey } = data;
  if (secretKey !== SECRET_KEY) {
    return res.status(404).json({ message: 'Wrong Secret Key.' })
  }
  if (secretKey === ADMIN_SECRET_KEY) {
    isAdmin = true;
  }
  // Connect to coaches database
  const client = await connectToDatabase();
  const db = client.db("coaches");
  // Find the coach's username
  const user = await db.collection('coach_data').findOne({ username });
  // If it exists, can't signup
  if (user) {
    client.close();
    return res.status(422).json({ message: 'User exists already!' });
  }
  // If doesn't exist hash the password and insert to database
  const hashedPassword = await hashPassword(password);
  const result = await db.collection('coach_data').insertOne({
    name,
    username,
    password: hashedPassword,
    isAdmin
  });
  // If succesful
  if (result) {
    client.close();
    return res.status(201).json({ message: 'Created user!' });
  }
  // And not.
  client.close();
  return res.status(404).json({ message: 'Error happened.' });
}

export default signUpCoach;
