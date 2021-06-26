<template>
  <div class="chat-container">
    <div class="chat-content" ref="chatScroll" >

      <div
        v-for="(ch, index) in getMessageHistory" :key="index" 
        class="chat" :class="ch.self? 'chat-self': 'chat-other'"
      >
        <div class="profile-container">
          <div v-if="ch.avatar" class="img-bg" >
            <img class="img-bg" style="border-radius: 50%;" width="30" height="30" v-bind:src="'data:image/jpeg;base64,' + ch.avatar" />
          </div>
          <!--
          <div 
            v-else class="profile" 
            style="background-image:url('/assets/img/misc/profile.jpg');"
          ></div>
          -->
        </div>
        <div class="text-container">
          <div class="text-wrapper p sm fw-300" v-html="ch.message"></div>
          <p class="mt-1 p sm fw-400 op-70">
            <span class="text-sm">
              {{formatDate((ch.createdAt), 'DD/MM/YYYY hh:mm:ss')}}
              <!-- (tempDate.toString().substr(0, 10)) -->
            </span>
          </p>
        </div>
      </div>

    </div>
    <form v-if="withInput" action="/" method="GET" @submit="onSubmit">
      <div class="chat-box">
        <div class="text-box">
          <FormGroup 
            type="text" placeholder="ส่งข้อความ..." :required="true" 
            :value="message" @input="message = $event" 
          />
        </div>
        <div class="btns mt-0">
          <Button 
            type="submit" text="ส่ง" classer="btn-color-01 hide-mobile" 
            :append="true" icon="send-white.svg" 
          />
          <Button 
            type="submit" text="ส่ง" classer="btn-color-01 show-mobile" 
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import FormGroup from './FormGroup';
import Button from './Button';
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: 'ChatContainer',
  components: [
    FormGroup,
    Button
  ],
  props: {
    chat: { type: Array, default: [] },
    roomid: { type: String, default: '' },
    withInput: { type: Boolean, default: true }
  },
  data() {
    return {
      randomId: Math.round(Math.random() * 1000000),
      selfChat: this.chat,
      message: '',
      job_id: ''
    }
  },
  mounted() {
    this.receiveMessage();
    this.scrollToEnd();
  },
  created() {
    console.log('this.$route.params.id :', this.roomid)
    window.onbeforeunload = () => {
                
    }
    
    this.InitialInfo({
      roomid: this.roomid,
      userid: this.getUser.id,
      avatar: this.getUser.avatar
    });

    this.joinChatRoom();
  },
  watch: {
    
  },
  computed: {
    ...mapGetters({
      getUser: 'auth/getUser',
      getUserDetail: 'auth/getUserDetail',
      getUserCompany: 'auth/getUserCompany',
      getSelfUserCompany: 'auth/getSelfUserCompany',
      getLoginStatus: 'auth/getLoginStatus',
      getLoadingStatus: 'auth/getLoadingStatus',
      getMessageHistory: 'socketIO/getMessageHistory',
      getSocketID: 'socketIO/getSocketID'
    })
  },
  updated() {
    // this.msg()
  },
  methods: {
    formatDate(value, format='YYYYMMDD') {
      return moment(String(value)).format(format);
    },
    scrollToEnd: function() {    	
      this.$refs.chatScroll.scrollTop = this.$refs.chatScroll.scrollHeight;   
    },
    onSubmit(e) {
      e.preventDefault();

      var that = this;

      that.sendMessage(that.message);

      that.message = '';

      setTimeout(() => {
        that.scrollToEnd();
      }, 100);
    },
    ...mapActions({
      joinChatRoom: 'socketIO/joinChatRoom',
      receiveMessage: 'socketIO/receiveMessage',
      sendMessage: 'socketIO/sendMessage'
    }),
    ...mapMutations({
      InitialInfo: 'socketIO/InitialInfo'
    })
  }
}
</script>
