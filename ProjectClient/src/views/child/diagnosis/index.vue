<script setup>

</script>

<template>
  <div class="profession">
    <div class="card">
      <div class="card-box">
         <div class="box">
          <div class="item">所在地区：xx省xx市</div>
        </div>
        <div class="box">
          <div class="item">用人单位：xxxx有限公司</div>
        </div>
        <van-tag plain  type="primary">接触的危害因素</van-tag>
        <table class="table">
          <thead>
          <tr>
            <th>危害因素名称</th>
            <th>工龄</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>粉尘</td>
              <td>2年1月</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.profession {
  .card {
    .box {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 2;
      .item + .item {
        margin-left: 24px;
      }
    }
    .van-tag {
      margin: 4px 0;
    }
    .table {
      width: 100%;
      font-size: 12px;
      th {
        font-weight: normal;
      }
      th,td {
        line-height: 1.6;
        text-align: left;
        width: 33%;
      }
    }
  }
}
</style>
