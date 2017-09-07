var app = new Vue({
  el: '#app',
  data: {
    produceList: [], 
    allSelectBtn:false,
    totalMoney:0,
    isShow:false,  
    curProduct:''//删除的下标
  },
  filters:{
    partFilter: function(value,type){
      return '￥'+value.toFixed(2)+type;
    }
  },
  mounted:function(){
  	this.$nextTick(function(){
  		this.createView();
  	})
  },
  methods:{
  	createView:function(){
  		this.$http.get('data/cartData.json').then(function(res){
        this.produceList=res.data.result.list;
      })
  	},
    //单选
    selectProduct:function(item){
      if(typeof item.checked=="undefined"){
        this.$set(item,'checked',true);
      }else{
        item.checked=!item.checked;
      }
      //选中全部则全选点亮
      var checkAllFlags=true;
      this.produceList.forEach(function(value,index){
        checkAllFlags=checkAllFlags && value.checked;
      });
      this.allSelectBtn = checkAllFlags;
      //计算总金额
      this.calTotalMoney();
    },
    //全选
    allSelect:function(flag){
        this.allSelectBtn=flag;
        this.produceList.forEach((item,index)=>{
            if(typeof item.checked=='undefined'){
              this.$set(item,'checked',this.allSelectBtn);
            }else{
              item.checked=this.allSelectBtn;
            }
        });

        //计算总金额
        this.calTotalMoney();
    },
     //加减
    changeMoney:function(item,type){
      if(type<0){
        item.productQuantity--;
        if(item.productQuantity<1){
            item.productQuantity=1;
        }
      }else{
        item.productQuantity++;
      }
      this.calTotalMoney();
    },
    //总金额
    calTotalMoney:function(){
      this.totalMoney=0;
      this.produceList.forEach((item,index)=>{
        if(item.checked){
          this.totalMoney+=item.productPrice*item.productQuantity;
        }
      })
    },
    //点击删除
    delBtn:function(item){
      this.isShow=true;
      this.curProduct=item;
    },
    //确认删除
    sureDel:function(){
      this.isShow=false;
      var index=this.produceList.indexOf(this.curProduct);
      this.produceList.splice(index,1);
      this.calTotalMoney();
    },
  }
})