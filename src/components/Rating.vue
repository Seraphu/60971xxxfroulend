<template>
  <div>
    <h1 class="p-text-center">Рейтинги</h1>
    
    <div v-if="this.$store.state.dataPreLoading" style="text-align: center">
      <ProgressSpinner strokeWidth="4" style="width:50px;height:50px"/>
    </div>
    
    <div v-else>
      <ConfirmDialog></ConfirmDialog>
      
      <DataView :layout="layout" :value="ratings">
        <template #grid="slotProps">
          <div class="p-col-12 p-md-3" style="padding: .5em">
            <div class="product-grid-item card">
              <Card>
                <template #header>
                  <div style="text-align: center; padding: 10px; background: #f5f5f5;">
                    {{ slotProps.data.name }}
                  </div>
                </template>
                <template #content>
                  <span class="pi pi-chart-line"></span>
                  <div v-if="slotProps.data.gender==1">
                    <img alt="boy" src="../assets/boy.png" style="width: 100%"/>
                  </div>
                  <div v-else>
                    <img alt="girl" src="../assets/girl.png" style="width: 100%"/>
                  </div>
                  <div class="p-mt-4" style="text-align: center">
                    Возраст: {{ getAge(slotProps.data) }}
                  </div>
                  <div style="margin-top: 15px; text-align: center;">
                    <Button 
                      v-tooltip.bottom="'Удалить рейтинг'" 
                      class="p-button-danger p-button-rounded" 
                      icon="pi pi-trash"
                      @click="delRating(slotProps.data.id)"
                      style="margin-right: 5px;">
                    </Button>
                    <Button 
                      v-tooltip.bottom="'Редактировать рейтинг'" 
                      class="p-button-primary p-button-rounded"
                      icon="pi pi-cog"
                      style="margin-left: 5px;">
                    </Button>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </template>
      </DataView>
      
      <Paginator 
        v-model:rows="rows" 
        :rowsPerPageOptions="[2,5,10,50]" 
        :totalRecords="total" 
        @page="onPage($event)">
      </Paginator>
    </div>
  </div>
</template>

<script>
import '../state.js'
import router from "../router";
import Paginator from 'primevue/paginator';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';

export default {
  name: "Rating",
  components: { 
    Paginator, 
    DataView, 
    Card, 
    ProgressSpinner, 
    ConfirmDialog,
    Button 
  },
  data() {
    return {
      rows: 5,
      layout: 'grid'
    }
  },
  methods: {
    onPage(event) {
      this.$store.state.pager.perPage = event.rows;
      this.$store.commit("setPage", event.page + 1);
      console.log(event.page);
      this.$store.dispatch("getRating");
    },
    delRating(id) {
      this.$confirm.require({
        message: 'Вы действительно хотите удалить рейтинг (данное действие необратимо)?',
        header: 'Удаление рейтинга',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.$store.dispatch('deleteRating', id);
        },
        reject: () => {
          console.log('Удаление отменено');
        }
      });
    },
    getAge(rating) {
      const now = new Date();
      const birthday = new Date(rating.birthday);
      const year = now.getFullYear() - birthday.getFullYear();
      const month = now.getMonth() - birthday.getMonth();
      let year_text = year + ' лет';
      if ((year % 100 == 1) && year > 14) year_text = year + ' год';
      if ((year % 100 == 2) || (year % 100 == 3) || (year % 100 == 4)) year_text = year + ' года';
      if (year == 0) year_text = month + ' мес.';
      return year_text;
    }
  },
  computed: {
    ratings: function () {
      return this.$store.state.rating;
    },
    total: function () {
      return this.$store.state.pager.total;
    }
  },
  mounted() {
    console.log('mounted rating');
    if (this.$store.state.loggedIn) {
      this.$store.dispatch("getRating");
      this.$store.commit("setLoginError", false);
    } else {
      router.push("/");
    }
  }
}
</script>

<style scoped>
.p-text-center {
  text-align: center;
  margin-bottom: 20px;
}
</style>
