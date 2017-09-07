var app = new Vue({
  el: '.container',
  data: {
      addressList: [], 
      curProductIndex:0,//选中当前的下标
      showNum:3,//限制地址显示条数
      isShow:false,
      isModAddress:false,//修改地址
      modAddId:'',
      modName:'',
      modStreetAddress:'',
      modTel:'',
      curItem:'',//删除的小标
      shippingMethod:1,
  },
  computed:{
    filterAddList:function(){
      return this.addressList.slice(0,this.showNum);
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      this.createView();
    })
  },
  methods:{
    createView:function(){
      this.$http.get('data/address.json').then(function(res){
        this.addressList=res.data.result;
      })
    },
    //修改地址
    modAddress:function(item){
      this.isModAddress=true;
      this.modAddId=item.addressId;
      this.modName=item.userName;
      this.modStreetAddress=item.streetName;
      this.modTel=item.tel;
    },
    //保存修改地址
    sureModAdd:function(addressId){
      var _this=this;
      this.isModAddress=false;
      this.addressList.forEach(function(item,index){
         if (item.addressId==addressId) {
           item.userName = _this.modName;
           item.streetName = _this.modStreetAddress;
           item.tel = _this.modTel;
         }
      });

    },
    //设为默认地址
    setDefault:function(addressId){
      this.addressList.forEach(function(item,index){
        if(item.addressId==addressId){
          item.isDefault=true;
        }else{
          item.isDefault=false;
        }
      })
    },
    //删除
    delBtn:function(item){
       this.isShow=true;
       this.curItem=item;
    },
    //确认删除
    sureDel:function(){
      this.isShow=false;
      var index=this.addressList.indexOf(this.curItem);
      this.addressList.splice(index,1);
    },
  },
 
  
})