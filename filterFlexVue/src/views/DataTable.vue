<template>
  <div class="flex">
    <div class="filter-section">
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="Start Date"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="End Date"
      ></el-date-picker>
      <el-button type="primary" @click="filterByDateRange">Start</el-button>

      <el-input
        v-model="customerNumber"
        placeholder="Search by Customer Number"
        class="filter-input"
      ></el-input>
      <el-button type="primary" @click="filterByCustomerNumber"
        >Search</el-button
      >

      <el-button type="success">Download</el-button>
      <span class="row-count-label"
        >Data number: {{ filteredTableData.length }}</span
      >
    </div>

    <el-table
      :data="filteredTableData"
      stripe
      style="width: 100%"
      :row-class-name="rowClassName"
    >
      <el-table-column
        prop="CustNr"
        label="Kunde-Nr"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="FULLNAME"
        label="Name"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="Fachrichtung"
        label="Fachrichtung"
        width="180"
      ></el-table-column>
      <el-table-column prop="City" label="City" width="180"></el-table-column>
      <el-table-column prop="eMail" label="Email" width="180"></el-table-column>
      <el-table-column label="Auftrag" width="180">
        <template #default="scope">
          <el-button @click.stop="showOrderDetails(scope.row)" type="text">{{
            scope.row.OrderNr
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="ORDERDATE"
        label="Datum"
        width="180"
      ></el-table-column>
      <el-table-column prop="status" label="Status" width="180"
        ><el-icon class="icon-margin"><Check /></el-icon
        ><el-icon class="icon-margin"><Minus /></el-icon
        ><el-icon class="icon-margin"><Delete /></el-icon
      ></el-table-column>
    </el-table>
    <el-dialog
      v-model="orderDialogVisible"
      :visible.sync="orderDialogVisible"
      width="50%"
      class="el-dialog"
    >
      <div v-if="selectedOrder">
        <h3>Order Details</h3>
        <p><strong>Order Number:</strong> {{ selectedOrder.OrderNr }}</p>
        <p><strong>Order Date:</strong> {{ selectedOrder.ORDERDATE }}</p>
        <p><strong>Customer Name:</strong> {{ selectedOrder.FULLNAME }}</p>
        <p><strong>Customer Email:</strong> {{ selectedOrder.eMail }}</p>
        <!-- Add other order details as required -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import oxidTestData from "../assets/oxidTestData.json";

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      customerNumber: "",
      tableData: oxidTestData,
      filteredTableData: oxidTestData,
      orderDialogVisible: false,
      selectedOrder: null,
    };
  },
  methods: {
    filterByDateRange() {
      this.filteredTableData = this.tableData.filter((row) => {
        let orderDate = new Date(row.ORDERDATE);
        let start = new Date(this.startDate);
        let end = new Date(this.endDate);

        return (
          (!this.startDate || orderDate >= start) &&
          (!this.endDate || orderDate <= end)
        );
      });
    },
    filterByCustomerNumber() {
      if (!this.customerNumber || this.customerNumber.trim() === "") {
        this.filteredTableData = [...this.tableData];
      } else {
        this.filteredTableData = this.tableData.filter((row) =>
          String(row.CustNr).includes(this.customerNumber)
        );
      }
    },

    showOrderDetails(order) {
      console.log(order);
      this.selectedOrder = order;

      this.orderDialogVisible = true;
    },
    rowClassName({ row, rowIndex }) {
      if (row.STATUS === 1) {
        return "background-color:#f78989";
        //return "warning-row";
      } else if (row.STATUS === 3) {
        return "background-color:#85ce61";
        //return "success-row";
      }
      return "";
    },
  },
  watch: {
    customerNumber() {
      this.filterByCustomerNumber();
    },
  },
};
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-top: 10px;
  margin-top: 10px;
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
  background-color: antiquewhite;
}
.row-count-label {
  margin-left: 10px;
  font-size: 14px;
  color: black;
  line-height: 2;
}
.icon-margin {
  margin-right: 15px;
  border: gray;
  background-color: white;
}
.el-dialog {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
}

.el-table .warning-row {
  --el-table-tr-bg-color: #f78989 !important;
}
.el-table .success-row {
  --el-table-tr-bg-color: #85ce61 !important;
}
/* .status-warning {
  background-color: #f78989;
}

.status-success {
  background-color: #85ce61;
} */
</style>
