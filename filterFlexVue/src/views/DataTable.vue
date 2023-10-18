<template>
  <div class="flex">
    <!-- Filters -->
    <div class="filter-section">
      <el-input v-model="searchDate" placeholder="Search by Date Range" class="filter-input"></el-input>
      <el-date-picker v-model="startDate" type="date" placeholder="Start Date"></el-date-picker>
      <el-date-picker v-model="endDate" type="date" placeholder="End Date"></el-date-picker>
      <el-button type="primary" @click="filterByDateRange">Start</el-button>
      
      <el-input v-model="customerNumber" placeholder="Search by Customer Number" class="filter-input"></el-input>
      <el-button type="primary" @click="filterByCustomerNumber">Search</el-button>
      
      <el-button type="success">Download</el-button>
    </div>

    <!-- Table -->
    <el-table :data="filteredTableData"  style="width: 100%">
      <el-table-column prop="CustNr" label="Kunde-Nr" width="180"></el-table-column>
      <el-table-column prop="FULLNAME" label="Name" width="180"></el-table-column>
      <el-table-column prop="Fachrichtung" label="Fachrichtung" width="180"></el-table-column>
      <el-table-column prop="City" label="City" width="180"></el-table-column>
      <el-table-column prop="eMail" label="Email" width="180"></el-table-column>
      <el-table-column prop="ORDERDATE" label="Datum" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import oxidTestData from "../assets/oxidTestData.json"

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      customerNumber: '',
      tableData: oxidTestData,
      filteredTableData: oxidTestData
    };
  },
  methods: {
    filterByDateRange() {
      this.filteredTableData = this.tableData.filter(row => {
        let orderDate = new Date(row.ORDERDATE);
        let start = new Date(this.startDate);
        let end = new Date(this.endDate);

        return (!this.startDate || orderDate >= start) && (!this.endDate || orderDate <= end);
      });
    },
    filterByCustomerNumber() {
      this.filteredTableData = this.tableData.filter(row => row.CustNr.includes(this.customerNumber));
    }
  }
};
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-input {
  width: 200px;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;  
}
</style>
