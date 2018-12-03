import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import echarts from 'echarts';

const options = {
  xAxis: {
    data: ["ember","angular","vue","react","backbone","knockout"]
  },
  yAxis: {},
  series: [{
    name: 'Sales',
    type: 'bar',
    data: [99, 1, 26, 50, 30, 60]
  }]
};

module('Integration | Component | echarts-chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    this.setProperties({ options, echarts });
    await render(hbs`{{echarts-chart echarts=echarts options=options}}`);

    assert.ok(
      document.querySelector('.echarts-chart canvas'),
      'show echarts canvas'
    );
  });

  test('hooks', async function(assert) {
    assert.expect(2);

    const onAfterSetup = () => assert.ok(true, 'call onAfterSetup');
    const onBeforeSetup = () => assert.ok(true, 'call onBeforeSetup');
    this.setProperties({
      options,
      onAfterSetup,
      onBeforeSetup,
      echarts
    });

    await render(hbs`{{echarts-chart
      onBeforeSetup=onBeforeSetup
      onAfterSetup=onAfterSetup
      options=options
      echarts=echarts
    }}`);
  });
});
