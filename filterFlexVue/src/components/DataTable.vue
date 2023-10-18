<template>
    <div>
      <!-- Filters -->
      <div class="filter-section">
        <el-input placeholder="Search by Date Range" class="filter-input"></el-input>
        <el-date-picker v-model="startDate" type="date" placeholder="Start Date"></el-date-picker>
        <el-date-picker v-model="endDate" type="date" placeholder="End Date"></el-date-picker>
        <el-button type="primary">Start</el-button>
        
        <el-input placeholder="Search by Customer Number" class="filter-input"></el-input>
        <el-button type="primary">Search</el-button>
        
        <el-button type="success">Download</el-button>
      </div>
  
      <!-- Table -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="customerNumber" label="Kunde-Nr" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <!-- Add other columns similarly -->
        <!-- ... -->
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
        tableData: [
          { customerNumber: '101105', name: 'Kristina Dr. Mugrauer' },
          // Add other rows similarly
          // ...
        ]
      };
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
  </style>
  