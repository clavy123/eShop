const lodash = require("lodash");
const BigPromise = require("../utils/PromiseError");
const CustomError = require("../utils/CustomError");
const path = require("path");
const fs = require("fs");
const WhereClause = require("../utils/WhereClause");

exports.getAllApi = BigPromise((req, res, next) => {
  try {
    const datapath = path.join(__dirname, "../data/item.json");
    
    //Check file existed or not
    if (!fs.existsSync(datapath)) {
      return next(new CustomError("File not existed"), 401);
    }
    //Read data from a file
    const data = fs.readFileSync(datapath, "utf-8");
    //Return error if data is empty
    if (!data) {
      return next(new CustomError("data is empty", 401));
    }
    // Parse existing data into an array if it's valid JSON
    let dataArray = [];
    try {
      if (data) {
        dataArray = JSON.parse(data);
      }
    } catch (err) {
      return next(new CustomError(error.message,401))
    }
    const resultPerPage = 3;
    const newData = new WhereClause(dataArray, req.query)
      .sorting()
      .filtering()
      .pagination(resultPerPage);

    const responseData = newData.bigArray
    // Serialize the updated array back to JSON
    const updatedData = JSON.stringify(responseData, null, 2);

    // Write the updated JSON back to the file
    fs.writeFileSync(datapath, updatedData, "utf-8");
    res.status(201).json({
      success: true,
      responseData,
    });
  } catch (error) {
    return next(new CustomError(error.message, 401));
  }
});

exports.getApi = BigPromise((req, res, next) => {
  try {
    const datapath = path.join(__dirname, "../data/item.json");
    if (!fs.existsSync(datapath)) {
      return next(new CustomError("file not existed"), 401);
    }
    const data = fs.readFileSync(datapath, "utf-8");
    if (!data) {
      return next(new CustomError("data is empty", 401));
    }
    const parsedData = JSON.parse(data);
    res.status(201).json({
      success: true,
      parsedData,
    });
  } catch (error) {
    return next(new CustomError(error.message,401))
  }
});

exports.postApi = BigPromise((req, res, next) => {
  try {
    const { id, name, email, password, message,price } = req.body;
    const json_data = {
      id: id,
      name: name,
      email: email,
      password: password,
      message: message,
      price: price
    };
    const datapath = path.join(__dirname, "../data/item.json");

    if (!fs.existsSync(datapath)) {
      return next(new CustomError("File not existed"), 401);
    }
    // Read existing data from the JSON file
    let existingData = fs.readFileSync(datapath, "utf-8");
    let dataArray = [];

    // Parse existing data into an array if it's valid JSON
    try {
      if (existingData) {
        dataArray = JSON.parse(existingData);
      }
    } catch (err) {
      return next(new CustomError("Json Parsing Error"), 401);
    }

    // Push the new data into the array
    dataArray.push(json_data);

    // Serialize the updated array back to JSON
    const updatedData = JSON.stringify(dataArray, null, 2);

    // Write the updated JSON back to the file
    fs.writeFileSync(datapath, updatedData, "utf-8");

    res.status(201).json({
      success: true,
      json_data,
    });
  } catch (error) {
    return next(new CustomError(error.message,401))
  }
});

exports.updateApi = BigPromise(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, password } = req.body;
    const datapath = path.join(__dirname, "../data/item.json");

    if (!fs.existsSync(datapath)) {
      return next(new CustomError("File not existed"), 401);
    }

    // Read existing data from the JSON file
    let existingData = fs.readFileSync(datapath, "utf-8");
    let dataArray = [];

    // Parse existing data into an array if it's valid JSON
    try {
      if (existingData) {
        dataArray = JSON.parse(existingData);
      }
    } catch (err) {
      return next(new CustomError(error.message,401))
    }

    // Find and remove the item with the specified id
    const itemToUpdate = dataArray.find((item) => item.id === id);
    if (itemToUpdate === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    itemToUpdate.email = email;
    itemToUpdate.password = password;

    // Serialize the updated array back to JSON
    const updatedData = JSON.stringify(dataArray, null, 2);

    // Write the updated JSON back to the file
    fs.writeFileSync(datapath, updatedData, "utf-8");

    res.status(201).json({
      success: true,
      message: "Item updated successfully",
    });
  } catch (error) {
    return next(new CustomError(error.message,401));
  }
});

exports.deleteApi = BigPromise((req, res, next) => {
  try {
    const id = req.params.id;
    const datapath = path.join(__dirname, "../data/item.json");

    if (!fs.existsSync(datapath)) {
      return next(new CustomError("File not existed"), 401);
    }

    // Read existing data from the JSON file
    let existingData = fs.readFileSync(datapath, "utf-8");
    let dataArray = [];

    // Parse existing data into an array if it's valid JSON
    try {
      if (existingData) {
        dataArray = JSON.parse(existingData);
      }
    } catch (err) {
       return next(new CustomError(err.message,401))
    }
    
    // Find and remove the item with the specified id
    const indexToRemove = dataArray.findIndex((item) => item.id === id);
    if (indexToRemove === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Remove the item from the array
    dataArray.splice(indexToRemove, 1);

    // Serialize the updated array back to JSON
    const updatedData = JSON.stringify(dataArray, null, 2);

    // Write the updated JSON back to the file
    fs.writeFileSync(datapath, updatedData, "utf-8");

    res.status(201).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return next(new CustomError(error.message,401))
  }
});
