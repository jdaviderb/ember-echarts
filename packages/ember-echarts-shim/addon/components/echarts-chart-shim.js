import EchartsBase from 'ember-echarts-base/components/echarts-chart';
import echarts from 'echarts';
export default EchartsBase.extend({
  init() {
    this.echarts = echarts;
    this._super(...arguments);
  }
});
