<template>
  <div class="chat-container">
    <div class="chat-content" ref="chatScroll">

      <div
        v-for="(ch, index) in selfChat" :key="index" 
        class="chat" :class="ch.self? 'chat-self': 'chat-other'"
      >
        <div class="profile-container">
          <div v-if="ch.avatar" class="img-bg">
            <img class="img-bg" width="50" height="50" v-bind:src="'data:image/jpeg;base64,' + ch.avatar" />
          </div>
          <div 
            v-else class="profile" 
            style="background-image:url('/assets/img/misc/profile.jpg');"
          ></div>
        </div>
        <div class="text-container">
          <div class="text-wrapper p sm fw-300" v-html="ch.message"></div>
          <p class="mt-1 p sm fw-400 op-70">
            <span class="text-sm">
              {{formatDate(ch.createdAt, 'DD/MM/YYYY HH:MM:SS')}}
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
import {mapGetters, mapActions} from "vuex"

var socket = io.connect('http://localhost:8081');

// socket.on('recive-message', (data) => {
//       console.log(data);
//       // chat.push(data.message)
//     });

export default {
  name: 'ChatContainer',
  components: [
    FormGroup,
    Button
  ],
  props: {
    chat: { type: Array, default: [] },
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
    this.scrollToEnd();
    console.log(this.getUser)
  },
  created() {
     window.onbeforeunload = () => {
                socket.emit('leave', this.username);
            }
    socket.emit('join', {
      job_id: '60c4a753346ad76c7277ec4d',
      user_id: this.getUser.id,
    });
  },
  mounted() {
    socket.on('recive-message', (data) => {
      console.log(data);
        this.chat.push({
          self: false,
          message: data.message,
          avatar: data.avatar,
          createdAt: data.createdAt
        })
    });
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
      getLoadingStatus: 'auth/getLoadingStatus'
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
      socket.emit('send-message', { 
        user_id: that.getUser.id,
        message: that.message,
        job_id: '60c4a753346ad76c7277ec4d',
        createAt : Date.now()
      });

      if(that.withInput){
        that.selfChat.push({
          self: true,
          message: that.message,
          avatar: null,
          createdAt: new Date()
        });
        that.message = '';
        setTimeout(() => {
          that.scrollToEnd();
        }, 100);
      }
    }/*,
    msg() {
      socket.on('recive-message',  (data) => 
        console.log(data)
      )
    }*/
  }
}
</script>
