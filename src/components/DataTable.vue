<template>

  <!-- Table Options -->
  <div v-if="withOptions" class="table-options">
    <div v-if="orders.length || Object.keys(groups).length" class="options hide-mobile">
      <div v-if="orders.length" class="option">
        <span class="color-gray">จัดเรียงตาม:</span> 
        <select class="xs no-border color-01" @input="(event)=>doOrder(event.target.value)">
          <option 
            v-for="(order, index) in orders" :key="order.key" :value="order.key" 
            :selected="index == 0"
          >
            {{order.text}}
          </option>
        </select>
      </div>
      <div v-if="Object.keys(groups).length" class="option">
        <span class="color-gray">จัดกลุ่ม:</span> 
        <fieldset>
          <div class="checkbox-row pl-3">
            <div 
              v-for="(option, index) in groups.options" :key="index"
              class="checkbox"
            >
              <input
                type="checkbox" :id="'group_'+randomId+'_'+index" 
                :value="option.value" :checked="option.checked" 
                @input="toggleGroup(index)"
              />
              <label :for="'group_'+randomId+'_'+index">
                {{option.text}}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="options">
      <div v-if="search.length > 0" class="option option-search">
        <div class="form-group">
          <div class="prepend xs">
            <input type="text" class="xs" placeholder="ค้นหารายการ"
              @input="(event)=>doSearch(event.target.value)" 
            />
            <div class="icon">
              <img src="/assets/img/icon/search.svg" alt="Image Icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="option hide-mobile">
        แสดง 
        {{Math.min(selfFilteredRows.length, (selfPage - 1) * pp + 1)}} – 
        {{Math.min(selfFilteredRows.length, selfPage * pp)}} จากทั้งหมด 
        {{selfFilteredRows.length}} 
        รายการ
      </div>
      <div class="option pr-2 show-mobile mobile-right">
        แสดงทั้งหมด
        {{Math.min(pp, selfFilteredRows.length - (selfPage - 1) * pp)}}
        รายการ
      </div>
      <div class="option pr-0">
        <a href="javascript:" @click="changePage(-1)" class="btn-chev" :class="{ 'disabled': selfPage == 1 }">
          <img src="/assets/img/icon/caret-left.svg" alt="Image Icon" />
        </a>
        <a href="javascript:" @click="changePage(1)" class="btn-chev" :class="{ 'disabled': selfPage == selfMaxPage }">
          <img src="/assets/img/icon/caret-right.svg" alt="Image Icon" />
        </a>
      </div>
      <div v-if="allowDownload" class="option option-download hide-mobile">
        <a class="btn btn-action btn-color-08 btn-sm" :href="downloadUrl" download>
          <img class="icon-prepend sm" src="/assets/img/icon/download-blue.svg" alt="Image Icon" />
          ดาวน์โหลด
        </a>
      </div>
    </div>
  </div>

  <!-- Table -->
  <form action="/" method="GET" @submit="onSubmit">
    <div class="table-wrapper">
      <table class="table-section">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">
              {{col.text}}
            </th>
          </tr>
        </thead>
        <tbody v-if="selfRows.length">

          <tr v-for="(row, index) in selfRows" :key="index">

            <!-- Row Data -->
            <template v-if="index != editingIndex">
              <td v-for="col in columns" :key="col.key" :class="col.classer">

                <a v-if="row[col.key].type == 'link'" 
                  class="d-flex ai-center" :class="row[col.key].classer" 
                  :href="row[col.key].href"
                  @click="row[col.key].clickFn"
                >
                  <div v-html="highlight(col.key, row[col.key].text)"></div>
                  <img v-if="row[col.key].iconPrepend" class="icon prepend"
                    :src="'/assets/img/icon/'+row[col.key].iconPrepend" alt="Image Icon" 
                  />
                </a>

                <div v-else-if="row[col.key].type == 'tag'" 
                  class="ss-tag" :class="row[col.key].classer"
                >
                  <div v-if="row[col.key].prepend" class="icon mr-2">
                    <img :src="row[col.key].icon" alt="Image Icon" />
                  </div>
                  <div v-html="highlight(col.key, row[col.key].text)"></div>
                  <div v-if="row[col.key].append" class="icon ml-2">
                    <img :src="row[col.key].icon" alt="Image Icon" />
                  </div>
                </div>

                <div v-else-if="row[col.key].type == 'options'" class="text-right">

                  <a v-if="row[col.key].view && row[col.key].view.type == 'link'" 
                    class="btn-icon fading" :href="row[col.key].view.href"
                  >
                    <img src="/assets/img/icon/table-view.svg" alt="Image Icon" />
                  </a>
                  <a v-else-if="row[col.key].view && row[col.key].view.type == 'emit'" 
                    class="btn-icon fading" href="javascript:" 
                    @click="()=>$emit('click-view', row[col.key].view.id)"
                  >
                    <img src="/assets/img/icon/table-view.svg" alt="Image Icon" />
                  </a>

                  <a v-if="row[col.key].edit && row[col.key].edit.type == 'link'" 
                    class="btn-icon fading" :href="row[col.key].edit.href"
                  >
                    <img src="/assets/img/icon/table-edit.svg" alt="Image Icon" />
                  </a>
                  <a v-else-if="row[col.key].edit && row[col.key].edit.type == 'emit'" 
                    class="btn-icon fading" href="javascript:" 
                    @click="()=>$emit('click-edit', row[col.key].edit.id)"
                  >
                    <img src="/assets/img/icon/table-edit.svg" alt="Image Icon" />
                  </a>
                  <a v-else-if="row[col.key].edit && row[col.key].edit.type == 'inline'" 
                    class="btn-icon fading" href="javascript:" 
                    @click="toggleEditing(index, row[col.key].edit.id, row)"
                  >
                    <img src="/assets/img/icon/table-edit.svg" alt="Image Icon" />
                  </a>

                  <a v-if="row[col.key].delete && row[col.key].delete.type == 'link'" 
                    class="btn-icon" :href="row[col.key].delete.href"
                  >
                    <img src="/assets/img/icon/delete.svg" alt="Image Icon" />
                  </a>
                  <a v-else-if="row[col.key].delete && row[col.key].delete.type == 'emit'" 
                    class="btn-icon" href="javascript:" 
                    @click="()=>$emit('click-delete', row[col.key].delete.id)"
                  >
                    <img src="/assets/img/icon/delete.svg" alt="Image Icon" />
                  </a>

                </div>

                <div v-else-if="row[col.key].type == 'status'" 
                  class="d-flex ai-center" :class="row[col.key].classer"
                >
                  <div v-if="row[col.key].value == 1">
                    <span class="dot active"></span> Active
                  </div>
                  <div v-else>
                    <span class="dot inactive"></span> Inactive
                  </div>
                </div>

                <div v-else-if="row[col.key].type == 'input'">
                  <div class="d-flex ai-center">
                    <input
                      type="number" class="mr-1" ref="counter"
                      :value="row[col.key].value"
                      :min="row[col.key].min" 
                      :max="row[col.key].max" 
                      :step="row[col.key].step"
                    />
                    <div class="chev-wrappers">
                      <a class="btn-chev" @click="addCounter(row[col.key].step, $event)">
                        <img src="/assets/img/icon/caret-up.svg" alt="Image Icon" />
                      </a>
                      <a class="btn-chev" @click="removeCounter(row[col.key].step, $event)">
                        <img src="/assets/img/icon/caret-down.svg" alt="Image Icon" />
                      </a>
                    </div>
                  </div>
                    
                </div>

                <div v-else-if="row[col.key].type == 'icon'">
                  <a href="#">
                    <img class="icon lg" :src="'/assets/img/icon/'+row[col.key].icon" alt="Image Icon" />
                  </a>
                </div>

                <div v-else-if="row[col.key].type == 'avatar'">
                  <div class="avatar">
                    <div class="img-bg" :style="'background-image:url(\''+row[col.key].text+'\');'"></div>
                  </div>
                </div>

                <div v-else class="d-flex ai-center" :class="row[col.key].classer" 
                  :title="row[col.key].text"
                >
                  <div v-html="highlight(col.key, row[col.key].text)"></div>
                  <img v-if="row[col.key].iconPrepend" class="icon prepend"
                    :src="'/assets/img/icon/'+row[col.key].iconPrepend" alt="Image Icon" 
                  />
                </div>
                
              </td>
            </template>

            <!-- Row Edit -->
            <template v-else>
              <td v-for="(add, key) in addOptions" :key="key" class="td-input">
                <div v-if="add.type == 'text' || add.type == 'number'">
                  <input
                    :type="add.type" class="xs w-full" v-model="row[key].text" 
                    :placeholder="add.placeholder" :required="add.required" 
                    :minlength="add.minlength" :maxlength="add.maxlength" 
                    :min="add.min" :max="add.max" :step="add.step" 
                    @input="addData[key] = $event.target.value" 
                  />
                </div>
                <div v-else-if="add.type == 'select'">
                  <select 
                    class="xs w-full" :required="add.required" v-model="row[key].value" 
                    @input="addData[key] = $event.target.value" 
                  >
                    <option v-for="(op, i) in add.options" :key="i" :value="op.value">
                      {{op.text}}
                    </option>
                  </select>
                </div>
              </td>
              <td class="td-input text-right">
                <button type="submit" class="btn-add-confirm">
                  <img src="/assets/img/icon/check-green-line.svg" alt="Image Icon" />
                </button>
                <a class="btn-add-close" href="#" @click="toggleEditing(null, null, null)">
                  <img src="/assets/img/icon/close-red.svg" alt="Image Icon" />
                </a>
              </td>
            </template>

          </tr>

          <!-- Row Add -->
          <tr v-if="allowAdd && !adding && Object.keys(addOptions).length">
            <td :colspan="columns.length" class="td-input-text">
              <a class="btn-add color-01" href="#" @click="toggleAdding()">
                <div class="icon">
                  <img src="/assets/img/icon/plus.svg" alt="Image Icon" />
                </div>
                {{allowAddText}}
              </a>
            </td>
          </tr>
          <tr v-else-if="allowAdd && adding && Object.keys(addOptions).length">
            <td v-for="(add, key) in addOptions" :key="key" class="td-input">
              <div v-if="add.type == 'text' || add.type == 'number'">
                <input
                  :type="add.type" class="xs w-full" v-model="add.value" 
                  :placeholder="add.placeholder" :required="add.required"  
                  :minlength="add.minlength" :maxlength="add.maxlength" 
                  :min="add.min" :max="add.max" :step="add.step" 
                  @input="addData[key] = $event.target.value" 
                />
              </div>
              <div v-else-if="add.type == 'select'">
                <select 
                  class="xs w-full" :required="add.required" v-model="add.value" 
                  @input="addData[key] = $event.target.value" 
                >
                  <option v-for="(op, i) in add.options" :key="i" :value="op.value">
                    {{op.text}}
                  </option>
                </select>
              </div>
            </td>
            <td class="td-input text-right">
              <button type="submit" class="btn-add-confirm">
                <img src="/assets/img/icon/check-green-line.svg" alt="Image Icon" />
              </button>
              <a class="btn-add-close" href="#" @click="toggleAdding()">
                <img src="/assets/img/icon/close-red.svg" alt="Image Icon" />
              </a>
            </td>
          </tr>

        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" :colspan="columns.length">
              ไม่พบข้อมูลที่ค้นหา
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>

</template>

<script>
import {mapGetters, mapActions, mapState} from "vuex"

export default {
  name: 'DataTable',
  props: {
    formJobRequest: { type: Boolean, default: false},
    filterStatus: { type: Object, default: {} },
    columns: { type: Array, default: [] },
    rows: { type: Array, default: [] },
    withOptions: { type: Boolean, default: true },
    page: { type: Number, default: 1 },
    pp: { type: Number, default: 10 },
    search: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    groups: { type: Object, default: {} },
    allowAdd: { type: Boolean, default: false },
    allowAddText: { type: String, default: '' },
    addOptions: { type: Object, default: {} },
    allowDownload: { type: Boolean, default: false },
    downloadUrl: { type: String, default: '' },
  },
  data() {
    return {
      randomId: Math.round(Math.random() * 1000000),
      selfPage: this.page,
      selfMaxPage: Math.ceil(this.rows.length / this.pp),
      selfFilteredRows: [...this.rows],
      selfRows: [...this.rows].slice(0, this.page * this.pp),
      selfSearch: '',
      selfOrder: '',
      selfGroups: Object.assign({}, this.groups),
      selfGroupArray: [],

      adding: false,
      addData: {},

      editing: false,
      editingIndex: null,
      editData: {}
    }
  },
  methods: {
    changePage(val) {
      this.clearEditing();
      this.selfPage += val;
      this.selfPage = Math.max(1, this.selfPage);
      this.selfPage = Math.min(this.selfMaxPage, this.selfPage);
      this.selfRows = this.selfFilteredRows.slice(
        (this.selfPage - 1) * this.pp, this.selfPage * this.pp
      );

      console.log('selfPage :', this.selfPage)
      console.log('selfRows :', this.selfRows)
    },
    toggleGroup(index) {
      var that = this;
      that.clearEditing();
      if(Object.keys(that.selfGroups).length){
        if(index > -1){
          that.selfGroups.options[index].checked = !that.selfGroups.options[index].checked;
        }
        that.selfGroupArray = [];
        that.selfGroups.options.forEach(function(d){
          if(d.checked) that.selfGroupArray.push(d.value);
        });
      }
      that.doSearch(that.selfSearch);
    },
    doSearch(val) {
      this.clearEditing();

      // Search
      this.selfSearch = val;
      if(val){
        var search = this.search;
        this.selfFilteredRows = this.rows.filter(function(item){
          var valid = false;
          for(var s of search){
            if(item[s] && item[s].text.indexOf(val) > -1){
              valid = true;
              break;
            }
          }
          return valid;
        });
      }else{
        this.selfFilteredRows = [...this.rows];
      }

      // Groups
      if(Object.keys(this.groups).length){
        var that = this;
        var groupFilter = that.groups.filter;
        that.selfFilteredRows = that.selfFilteredRows.filter(function(item){
          return that.selfGroupArray.indexOf(item[groupFilter].value) > -1;
        });
      }

      this.selfPage = 1;
      this.selfMaxPage = Math.ceil(this.selfFilteredRows.length / this.pp);
      this.selfRows = this.selfFilteredRows.slice(
        (this.selfPage - 1) * this.pp, this.selfPage * this.pp
      );
      this.doOrder(this.selfOrder);
      return true;
    },
    doOrder(val) {
      this.clearEditing();
      this.selfOrder = val;
      if(val.indexOf('-desc') > -1){
        val = val.replace('-desc', '');
        this.selfFilteredRows.sort(function(a, b){
          if(!a[val] || !b[val]){
            return false;
          }else{
            return (a[val].text > b[val].text)? -1: ((b[val].text > a[val].text)? 1: 0);
          }
        });
      }else if(val.indexOf('-asc') > -1){
        val = val.replace('-asc', '');
        this.selfFilteredRows.sort(function(a, b){
          if(!a[val] || !b[val]){
            return false;
          }else{
            return (a[val].text > b[val].text)? 1: ((b[val].text > a[val].text)? -1: 0);
          }
        });
      }
      this.selfRows = this.selfFilteredRows.slice(
        (this.selfPage - 1) * this.pp, this.selfPage * this.pp
      );
      return true;
    },

    highlight(key, text) {
      if(key != 'options' && this.search.indexOf(key) > -1 && this.selfSearch){
        return text.replace(
          new RegExp(this.selfSearch, 'ig'), 
          '<span class="h">'+this.selfSearch+'</span>'
        );
      }else{
        return text;
      }
    },

    toggleAdding() {
      var that = this;
      that.clearEditing();
      that.adding = !this.adding;
      that.addData = {};
      Object.keys(that.addOptions).forEach(function(key){
        if(['text', 'select'].indexOf(that.addOptions[key].type) > -1){
          that.addData[key] = that.addOptions[key].value? that.addOptions[key].value: null;
        }
      });
    },

    clearEditing() {
      this.editing = false;
      this.editingIndex = null;
      this.editData = {};
    },
    toggleEditing(index, id, row) {
      var that = this;
      that.adding = false;
      that.editing = !that.editing;
      that.editingIndex = index;
      if(!id || !row){
        that.editData = {};
      }else{
        that.editData = { id: id };
        Object.keys(that.addOptions).forEach(function(key){
          if(['text', 'select'].indexOf(that.addOptions[key].type) > -1){
            that.editData[key] = row[key].value? row[key].value: row[key].text;
          }
        });
      }
    },

    onSubmit(e) {
      e.preventDefault();
      if(this.adding){
        var data = Object.assign({}, this.addData);
        this.toggleAdding();
        this.clearEditing();
        return this.$emit('row-add', data);
      }else if(this.editing){
        var data = Object.assign({}, this.editData);
        this.clearEditing();
        return this.$emit('row-edit', data);
      }
    },

    addCounter(step, event){
      var counter = this.$refs.counter;
      var btn = event.target.parentNode;
      var parent = btn.parentNode;
      if(parent.children[1].classList.contains('disabled')){
        parent.children[1].classList.remove('disabled');
      }
      let val = Number(counter.value),
          max = Number(counter.max);
      var result = val + step > max ? max: val + step;
      if (result == max){
        btn.classList.add('disabled');
      }
      counter.value = result;
    },
    removeCounter(step, event){
      var counter = this.$refs.counter;
      var btn = event.target.parentNode;
      var parent = btn.parentNode;
      if(parent.children[0].classList.contains('disabled')){
        parent.children[0].classList.remove('disabled');
      }
      let val = Number(counter.value),
          min = Number(counter.min);
      var result = val - step < min ? min: val - step;
      if (result == min){
        btn.classList.add('disabled');
      }
      counter.value = result;
    },
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
    })
  },
  created() {
    this.toggleGroup(-1);
    if(this.orders.length){
      this.doOrder(this.orders[0].key);
    }

    if ( (this.getUser.role == "freight-forwarder") && (this.formJobRequest == true) ){
      console.log('filterStatus :', this.filterStatus)
    }
  },
  emits: [ 
    'click-view', 'click-edit', 'click-delete', 
    'row-add', 'row-edit', 
    'add-input', 'inputChange' 
  ]
}
</script>