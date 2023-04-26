const request = require('supertest');
const User = require('../src/models/user.model');
const app = require('../src/server');

describe('User API', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('Create user', () => {
    test('should create a new user', async () => {
      const newUser = {
        name: 'johndoe1',
        email: 'johndoe1@example.com',
        password: 'password1'
      };

      const response = await request(app)
        .post('/api/users/create/user')
        .send(newUser)
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(200);

      expect(response.body.data.user).toHaveProperty('_id');

      const user = await User.findById(response.body.data.user._id);
      expect(user.name).toBe(newUser.name);
      expect(user.email).toBe(newUser.email);
      expect(user.password).toBe(newUser.password);
    });

    test('should return 400 for invalid input', async () => {
      const newUser = {
        name: 'johndoe5'
      };

      const response = await request(app)
        .post('/api/users/create/user')
        .send(newUser)
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(400);

      expect(response.body.message).toBe('invalid input');
    });
  });

  describe('Get user', () => {
    test('should get a user by id', async () => {
      const user = new User({
        name: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password'
      });
      await user.save();

      const response = await request(app)
        .get('/api/users/getUser')
        .send({userId: user._id})
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(200);

      expect(response.body.data.user).toHaveProperty('_id', user._id.toString());
      expect(response.body.data.user).toHaveProperty('name', user.name);
      expect(response.body.data.user).toHaveProperty('email', user.email);
      expect(response.body.data.user).toHaveProperty('password', user.password);
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/getUser')
        .send({userId: '6447a21116e8cd7631ef8ca3'})
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(404);

      expect(response.body.message).toBe('User Not Found');
    });
  });

  describe('Update user', () => {
    test('should update a user by id', async () => {
      const user = new User({
        name: 'johndoe3',
        email: 'johndoe3@example.com',
        password: 'password3'
      });
      await user.save();

      const updatedUser = {
        userId: user._id,
        name: 'johndoe7',
        email: 'johndoe7@example.com',
        password: 'password7'
      };

      const response = await request(app)
        .post('/api/users/update/user')
        .send(updatedUser)
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(200);

      expect(response.body.data.user).toHaveProperty('_id', user._id.toString());
      expect(response.body.data.user).toHaveProperty('name', updatedUser.name);
      expect(response.body.data.user).toHaveProperty('email', updatedUser.email);
      expect(response.body.data.user).toHaveProperty('password', updatedUser.password);

      const dbUser = await User.findById(user._id);
      expect(dbUser).toHaveProperty('name', updatedUser.name);
      expect(dbUser).toHaveProperty('email', updatedUser.email);
      expect(dbUser).toHaveProperty('password', updatedUser.password);
    })
    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .post('/api/users/update/user')
        .send({
          userId: '6447a21116e8cd7631ef8ca3',
          name: 'johndoe6',
          email: 'johndoe6@example.com'
        })
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(404);

      expect(response.body.message).toBe('User Not Found');
    });
  })

  describe('Delete user', () => {
    test('should delete a user by id', async () => {
      const user = new User({
        name: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password'
      });
      await user.save();

      const response = await request(app)
        .post('/api/users/delete/user')
        .send({userId: user._id})
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(200);

      const dbUser = await User.findById(user._id);
      expect(dbUser).toBeNull();
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .post('/api/users/delete/user')
        .send({userId: '6447a21116e8cd7631ef8ca3'})
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(404);

      expect(response.body.message).toBe('User Not Found');
    });
  });

  describe('Get all users', () => {
    test('should return all users', async () => {
      const users = [
        {
          name: 'johndoe0',
          email: 'johndoe0@example.com',
          password: 'password0'
        },
        {
          name: 'janedoe1',
          email: 'janedoe1@example.com',
          password: 'password1'
        }
      ];
      await User.insertMany(users);

      const response = await request(app)
        .get('/api/users/getUsers')
        .set('Accept', 'application/json, text/html')
        .expect('Content-Type', /json|html/)
        .expect(200);

      expect(response.body.data.users.length).toBe(users.length);
      response.body.data.users.forEach((user, index) => {
        expect(user.name).toBe(users[index].name);
        expect(user.email).toBe(users[index].email);
        expect(user.password).toBe(users[index].password);
      });
    });
  })
})
