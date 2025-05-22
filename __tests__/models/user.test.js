const { User } = require("../test-setup");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({ 
      username: "testuser", 
      password: "Abcd1234.",
      email: "test@test.com",
      profilePic: "https://picsum.photos/seed/abc/200/200"
    })

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profilePic).toBe("https://picsum.photos/seed/abc/200/200")
  });

  it("should validate email format", async () => {
    // Build: Create a new user instance without saving it to the database
    const user = User.build({ 
      username: "testuser2", 
      password: "Abcd1234.",
      email: "invalid-email",
      profilePic: "https://picsum.photos/seed/abc/200/200"
    });
    // Validate: Check if the user instance is valid
    // rejects.toThrow() is used to check if the user instance is invalid
    expect(user.validate()).rejects.toThrow();
  });

  it("should validate profilePic format", async () => {
    const user = User.build({ 
      username: "testuser3", 
      password: "Abcd1234.",
      email: "test@test.com",
      profilePic: "not-a-url"
    });

    expect(user.validate()).rejects.toThrow();
  });
  
  it("should enforce unique usernames", async () => {
    
    let err;

    try {      
      await User.create({ 
        username: "testuser", 
        password: "Abcd1234.",
        email: "different@test.com",
        profilePic: "https://picsum.photos/seed/abc/200/200"
      });
    } catch (error) {
      err = error  
    }

    expect(err).toBeDefined()
    expect(err.name).toBe('SequelizeUniqueConstraintError');
  });

  it("should enforce unique emails", async () => {
    
    let err;

    try {      
      await User.create({ 
        username: "different-user", 
        password: "Abcd1234.",
        email: "test@test.com",
        profilePic: "https://picsum.photos/seed/abc/200/200"
      });
    } catch (error) {
      err = error  
    }

    expect(err).toBeDefined()
    expect(err.name).toBe('SequelizeUniqueConstraintError');
  });

});

