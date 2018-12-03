import Component from '@ember/component';
import { observer } from '@ember/object';

export default Component.extend({
  classNames: ['echarts-chart'],

  onBeforeSetup() {},
  onAfterSetup() {},

  updateChart: observer('options', 'showLoading', function() {
    this._refreshChart();
  }),

  init() {
    this._super(...arguments);
    this.resizeListener = window.addEventListener('resize', this._resizeChart.bind(this));
  },

  didRender() {
    this._super(...arguments);
    this.chart();
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener('resize', this.resizeListener);
    if (this.chart()) { this.chart().dispose(); }
  },

  chart() {
    if (!this._chart) { this._chart = this._createChart(); }
    return this._chart;
  },

  _createChart() {
    let chart;
    if (this.element) {
      chart = this.echarts.init(this.element, this.theme);
      this.onBeforeSetup(this, chart);
      if (this.options) { chart.setOption(this.options); }
      if (this.showLoading) { chart.showLoading(); }
      this._bindChartEvents(chart);
      this.onAfterSetup(this, chart);
    }
    return chart;
  },

  _bindChartEvents(chart) {
    const onEvents = this.onEvents || {};
    const bindEvent = (event) => chart.on(event, onEvents[event]);
    Object.keys(onEvents).forEach(bindEvent);
  },

  _refreshChart() {
    this.chart().setOption(this.options);
    if (this.showLoading) { this.chart().showLoading(this.loadingOptions); }
    else { this.chart().hideLoading(); }
  },

  _resizeChart() {
    if (this.chart()) { this.chart().resize(); }
  }
});
