<template>
  <div class="chat-container">
    <div class="chat-content" ref="chatScroll">

      <div
        v-for="(ch, index) in selfChat" :key="index" 
        class="chat" :class="ch.self? 'chat-self': 'chat-other'"
      >
        <div class="profile-container">
          <div 
            v-if="ch.avatar" class="profile" 
            :style="'background-image:url(\''+ch.avatar+'\');'"
          ></div>
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
      message: ''
    }
  },
  mounted() {
    this.scrollToEnd();
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
    }
  }
}
</script>
