class WhereClause {
  constructor(bigArray, query) {
    this.bigArray = bigArray;
    this.query = query;
  }

  sorting() {
    const query = this.query.sort;
    //query to sort the data
    let sortedProducts = [];
    if (query) {
      sortedProducts = this.bigArray.sort((p1, p2) =>
        p1.name.localeCompare(p2.name)
      );
    } else {
      sortedProducts = this.bigArray.sort((p1, p2) => p1.id - p2.id);
    }
    this.bigArray = sortedProducts;
    return this;
  }
  filtering() {
    const copyQ = { ...this.query };
    //Deleting other query to filter data
    delete copyQ["sort"];
    delete copyQ["page"];
    delete copyQ["limit"];
    //Converting query to string for applying regex
    let stringOfCopy = JSON.stringify(copyQ);
    stringOfCopy = stringOfCopy.replace(/\b(gte|lte|gt|lt)\b/g, (m) => `$${m}`);
    let jsonOfCopyQ = JSON.parse(stringOfCopy);
    //Getting gte and lte value to filter
    let { $gte, $lte } = jsonOfCopyQ;
    let filteredDataArray = this.bigArray.filter(
      (value) => value.price >= $gte && value.price <= $lte
    );
    this.bigArray = filteredDataArray;
    return this;
  }
  pagination(resultPerPage) {
    let currentPage = 1;
    if (this.query.page) {
      currentPage = this.query.page;
    }
    const skipPage = (currentPage - 1) * resultPerPage;
    let paginatedItems = this.bigArray.slice(skipPage).slice(0, resultPerPage);
    this.bigArray = paginatedItems;
    return this;
  }
}

module.exports = WhereClause;
