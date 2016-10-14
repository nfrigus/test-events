const
  chai = require('chai');

describe('EventLayoutService', () => {
  const
    Entity = require('../src/EventLayoutService'),
    eventSets = require('./eventSets');

  it('Can accept events and return event layouts', () => {
    let entity = new Entity;

    chai.expect(Entity).to.respondTo('addEvents');
    chai.expect(Entity).to.respondTo('getEventsLayout');
  });

  it('Can arrange events to minimum cols possible', () => {
    chai.assert.equal(
      new Entity().arrangeIntersectingEventsToCols(eventSets.intersect.two_rows).length,
      2
    );
  });

  it('Can properly arrange events to groups and cols', () => {
    chai.expect(
      new Entity().addEvents(eventSets.example).getEventsLayout()
    ).to.be.deep.equal(
      eventSets.example_ordered
    );
  });

  it('Can sort events by start and duration', () => {
    new Entity().sortEvents(eventSets.sort.unsorted);

    chai.expect(eventSets.sort.unsorted).to.deep.equal(eventSets.sort.sorted);
  });

  it('Can find intersecting events', () => {
    let
      intersections = new Entity().addEvents(eventSets.example).getIntersections();

    chai.expect(intersections).to.have.lengthOf(6);
  });
});
