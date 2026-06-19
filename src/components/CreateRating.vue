<template>
  <Dialog :key="$route.fullPath" v-model:visible="visible" closable close-on-escape modal>
    <template #header>
      <div>Создание рейтинга</div>
    </template>
    
    <h5>Имя рейтинга</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-user" style="position: relative; left: 25px" />
      <InputText v-model="name" aria-describedby="name-help" placeholder="Имя" type="text"/><br>
      <small v-if="this.$store.state.validation.name" id="name-help" class="p-error">
        {{ this.$store.state.validation.name }}
      </small>
    </span>

    <h5>Описание</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-lock" style="position: relative; left: 25px"/>
      <InputText v-model="description" aria-describedby="description-help" placeholder="Комментарий" type="text"/>
      <br>
      <small v-if="this.$store.state.validation.description" id="description-help" class="p-error">
        {{ this.$store.state.validation.description }}
      </small>
    </span>

    <h5>Дата рождения</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-calendar" style="position: relative; left: 18px"/>
      <Calendar v-model="birthday" dateFormat="dd.mm.yy" style="position: relative; left: 18px"/>
      <br>
      <small v-if="this.$store.state.validation.birthday" id="birthday-help" class="p-error">
        {{ this.$store.state.validation.birthday }}
      </small>
    </span>

    <h5>Пол</h5>
    <div class="p-field-radiobutton">
      <RadioButton id="man" v-model="gender" value="1"/>
      <label for="man">Мужской</label>
    </div>
    <div class="p-field-radiobutton">
      <RadioButton id="woman" v-model="gender" value="0"/>
      <label for="woman">Женский</label>
    </div>
    <br>
    <small v-if="this.$store.state.validation.gender" id="gender-help" class="p-error">
      {{ this.$store.state.validation.gender }}
    </small>

    <template #footer>
      <Button autofocus icon="pi pi-check" label="Создать" @click="create"/>
    </template>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';

export default {
  name: 'CreateRating',
  components: { Dialog, Button, InputText, Calendar, RadioButton },
  data() {
    return {
      name: '',
      description: '',
      birthday: '',
      gender: '',
      visible: false,
      modal: true,
    }
  },
  watch: {
    birthday: function () {
      if (this.birthday) {
        const date = new Date(this.birthday);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        this.birthday = `${year}-${month}-${day}`;
      }
    }
  },
  methods: {
    create() {
      this.$store.dispatch('createRating', {
        name: this.name,
        description: this.description,
        birthday: this.birthday,
        gender: this.gender
      });
    }
  },
  mounted() {
    this.visible = this.$store.state.createRatingDialogVisible;
  }
}
</script>

<style scoped>
.p-input-icon-left {
  display: block;
  margin-bottom: 15px;
}
.p-field-radiobutton {
  margin-bottom: 10px;
}
</style>
