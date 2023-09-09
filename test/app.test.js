const {
  getApi,
  postApi,
  updateApi,
  deleteApi,
} = require("../controllers/apicontroller");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("User API", () => {
  describe("POST /api", () => {
    it("should handle post api", (done) => {
      chai
        .request(`${process.env.API_BASE}/api/v1`)
        .post("/api")
        .send({
          id: "10",
          name: "testuser",
          email: "testuser@gmail.com",
          password: "testuser@123",
          message: "testuser want to access code",
          price: 2000,
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(401);
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("success").equal(true);
          }

          done();
        });
    });
  });
});

describe("User API", () => {
  describe("Get /", () => {
    it("should handle get api", (done) => {
      chai
        .request(`${process.env.API_BASE}/api/v1`)
        .get("/")
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(401);
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("success").equal(true);
          }

          done();
        });
    });
  });
});

describe("User api", () => {
  describe("delete /api", () => {
    it("should handle delete api", (done) => {
      chai
        .request(`${process.env.API_BASE}/api/v1`)
        .delete("/api/1")
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(401);
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("success").equal(true);
          }

          done();
        });
    });
  });
});


describe("User api", () => {
    describe("put /api", () => {
      it("should handle put api", (done) => {
        console.log(process.env.API_BASE)
        chai
          .request(`${process.env.API_BASE}/api/v1`)
          .put("/api/3")
          .send({email:"testuser@gmail.com",password:"testuser@123"})
          .end((err, res) => {
            if (err) {
              expect(res).to.have.status(401);
            } else {
              expect(res).to.have.status(201);
              expect(res.body).to.have.property("success").equal(true);
            }
  
            done();
          });
      });
    });
  });

  describe("User API", () => {
    describe("Get /all", () => {
      it("should handle getall api", (done) => {
        chai
          .request(`${process.env.API_BASE}/api/v1`)
          .get("/all?sort=name&gte=1000&lte=1500&page=1")
          .end((err, res) => {
            if (err) {
              expect(res).to.have.status(401);
            } else {
              expect(res).to.have.status(201);
              expect(res.body).to.have.property("success").equal(true);
            }
  
            done();
          });
      });
    });
  });