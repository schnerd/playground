import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import {Hint} from 'react-vis';

import Energy from './data/energy';
import Sankey from '../src';

import './setup';

test('Sankey: renders with props', assert => {
  const props = {
    nodes: [],
    links: [],
    width: 200,
    height: 200
  };
  const $ = mount(<Sankey {...props} />);
  const wrapperProps = $.props();
  assert.ok(
    $.find(Sankey).length,
    'Sankey is rendered'
  );
  Object.keys(props).forEach(propName => {
    assert.ok(
      wrapperProps[propName] === props[propName],
      `${propName} is set`);
  });
  assert.end();
});

test('Sankey: labels', t => {
  const $ = mount(
    <Sankey
      height={100}
      width={100}
      nodes={[{name: 'one'}, {name: 'two'}]}
      links={[{source: 0, target: 1}]}
    />
  );

  t.equal($.find('text').length, 2, 'there should be two node labels');
  $.setProps({hideLabels: true});
  t.equal($.find('text').length, 0, 'the labels should now be hidden');

  t.end();

});

test('Sankey: children', t => {
  const $ = mount(
    <Sankey
      height={100}
      width={100}
      nodes={[{name: 'one'}, {name: 'two'}]}
      links={[{source: 0, target: 1}]}
    >
      <Hint x={0} y={0} value={{test: 123}}/>
    </Sankey>
  );
  t.equal($.find(Hint).length, 1, 'should find children of sankey');

  t.end();
});

test('Sankey: Showcase Example - Basic Sankey', t => {
  const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
  const links = [
    {source: 0, target: 1, value: 10, opacity: 0.2},
    {source: 0, target: 2, value: 20},
    {source: 1, target: 2, value: 20}
  ];

  const $ = mount(
    <Sankey
      nodes={nodes}
      links={links}
      width={200}
      height={200}
    />
  );
  t.equal($.find('.rv-sankey__link').length, 3, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node rect').length, 3, 'should find the right number of nodes');

  t.end();
});

test('Sankey: Voronoi Sankey', t => {
  const mouseOverSpy = sinon.spy();
  const mouseOutSpy = sinon.spy();
  const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
  const links = [
    {source: 0, target: 1, value: 10},
    {source: 0, target: 2, value: 20},
    {source: 1, target: 2, value: 20}
  ];

  const $ = mount(
    <Sankey
      nodes={nodes.map(d => ({...d}))}
      links={links.map(d => ({...d}))}
      width={200}
      height={200}
      hasVoronoi
      onValueMouseOver={mouseOverSpy}
      onValueMouseOut={mouseOutSpy}
    />
  );

  t.equal($.find('.rv-sankey__link').length, 3, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node rect').length, 3, 'should find the right number of nodes');
  t.equal($.find('.rv-voronoi').length, 1, 'should find the right number of voronoi wrappers');
  t.equal($.find('.rv-voronoi__cell').length, 3, 'should find the right number of voronoi cells');

  $.find('.rv-voronoi__cell').at(0).simulate('mouseOver');
  t.equal(mouseOverSpy.callCount, 1, 'should invoke callback on mouseOver');
  t.equal(mouseOutSpy.callCount, 0, 'should not invoke mouseOut callback on mouseOver');
  t.equal(mouseOverSpy.args[0][0].name, 'a', 'should pass node to mouseOver callback');
  $.find('.rv-voronoi__cell').at(0).simulate('mouseOut');
  t.equal(mouseOutSpy.callCount, 1, 'should invoke callback on mouseOut');
  t.equal(mouseOverSpy.callCount, 1, 'should not invoke mouseOver callback on mouseOut');

  t.end();
});

test('Sankey: Complex data (energy)', t => {
  const $ = mount(
    <Sankey
      animation
      margin={50}
      nodes={Energy.nodes}
      links={Energy.links}
      width={960}
      align="center"
      height={500}
      layout={24}
      nodeWidth={15}
      nodePadding={10}
      style={{
        links: {
          opacity: 0.3
        },
        labels: {
          fontSize: '8px'
        },
        rects: {
          strokeWidth: 2,
          stroke: '#1A3177'
        }
      }}
    />
  );

  const expectedText = 'Agricultural \'waste\'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind';
  t.equal($.text(), expectedText, 'should have expected labels');
  t.equal($.find('.rv-sankey__link').length, 68, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node rect').length, 48, 'should find the right number of nodes');

  t.end();
});

test('Sankey: Can show children (for hints, etc)', t => {
  const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
  const links = [
    {source: 0, target: 1, value: 10, opacity: 0.2},
    {source: 0, target: 2, value: 20},
    {source: 1, target: 2, value: 20}
  ];

  const $ = mount(
    <Sankey
      nodes={nodes}
      links={links}
      width={200}
      height={200}
    >
      <Hint x={10} y={10} value={{
        'a ➞ b': 10
      }}/>
    </Sankey>
  );

  t.equal($.find('.rv-sankey__link').length, 3, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node rect').length, 3, 'should find the right number of nodes');
  t.equal($.find(Hint).length, 1, 'should find that hint is shown');

  t.end();
});
