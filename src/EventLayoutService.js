module.exports = class {

  constructor() {
    this._eventsList = [];
  }

  /**
   * Add events to service
   */
  addEvents(events) {
    if (!Array.isArray(events)) {
      events = [events];
    }

    this._eventsList = this._eventsList.concat(events);

    return this;
  }

  /**
   * Arrange group of intersacting events to cols
   *
   * @return Array of cols with events
   */
  arrangeIntersectingEventsToCols(events) {
    this.sortEvents(events);

    let cols = [
      []
    ];

    events.map(event => {
      let
        isAddedToExistingCol = false;

      cols.map(col => {
        if (isAddedToExistingCol) {
          return;
        }

        let
          colLastEvent = col.slice(-1)[0];

        if (!colLastEvent || !areEventsIntersecting(event, colLastEvent)) {
          col.push(event);
          isAddedToExistingCol = true;
        }
      });

      if (!isAddedToExistingCol) {
        cols.push([event]);
      }

    });

    return cols;
  }

  /**
   * Get events ordered in intersection groups and columns
   */
  getEventsLayout() {
    return this.getIntersections().map(intersectionGroup => this.arrangeIntersectingEventsToCols(intersectionGroup));
  }

  /**
   * Order added events by start and duration
   */
  sortEvents(list) {
    list = list || this._eventsList;

    list.sort((a, b) => a.start - b.start || a.duration - b.duration);

    return this;
  }

  /**
   * Groups added events to intersecting groups
   *
   * @return Array of intersecting events groups
   */
  getIntersections() {
    this.sortEvents();

    let
      intersectionList = this._eventsList.reduce((list, event) => {
        if (!list.length) {
          list.push([event]);
        } else {
          let
            addedToExistingList = false;

          list.map(intersectinEvents =>
            intersectinEvents.map(eventFromList => {
              if (areEventsIntersecting(event, eventFromList)) {
                intersectinEvents.push(event);
                addedToExistingList = true;
              }
            })
          );

          if (!addedToExistingList) {
            list.push([event]);
          }
        }

        return list;
      }, []);

    return intersectionList;
  }
}

/**
 * Check event intersection
 */
function areEventsIntersecting(event1, event2) {
  let events = [event1, event2].sort((a, b) => a.start - b.start);

  return events[0].start + events[0].duration > events[1].start;
}
