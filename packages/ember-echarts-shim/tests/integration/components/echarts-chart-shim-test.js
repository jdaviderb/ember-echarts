import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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

module('Integration | Component | echarts-chart-shim', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    this.set('options', options);
    await render(hbs`{{echarts-chart-shim options=options}}`);

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
      onBeforeSetup
    });

    await render(hbs`{{echarts-chart-shim
      onBeforeSetup=onBeforeSetup
      onAfterSetup=onAfterSetup
      options=options
    }}`);
  });
});
