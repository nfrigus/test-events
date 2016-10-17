const
  chai = require('chai');

describe('EventLayoutService', () => {
  const
    Entity = require('../src/EventLayoutService'),
    eventSets = require('./eventSets');

  it('Can arrange events to minimum cols possible', () => chai.assert.equal(
    Entity.arrangeIntersectingEventsToCols(eventSets.intersect.two_rows).length, 2));

  it('Can properly arrange events to groups and cols', () => chai.expect(
    Entity.getEventsLayout(eventSets.example)
  ).to.be.deep.equal(
    eventSets.example_ordered
  ));

  it('Can sort events by start and duration', () => {
    Entity.sortEvents(eventSets.sort.unsorted);
    chai.expect(eventSets.sort.unsorted).to.deep.equal(eventSets.sort.sorted);
  });

  it('Can find intersecting events', () => chai.expect(Entity.getIntersections(eventSets.example)).to.have.lengthOf(6));
});
