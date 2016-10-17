module.exports = {
  arrangeIntersectingEventsToCols,
  getEventsLayout,
  sortEvents,
  getIntersections,
  areEventsIntersecting,
}

/**
 * Arrange group of intersacting events to cols
 *
 * @return Array of cols with events
 */
function arrangeIntersectingEventsToCols(events) {
  sortEvents(events);

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
function getEventsLayout(events) {
  return getIntersections(events).map(intersectionGroup => arrangeIntersectingEventsToCols(intersectionGroup));
}

/**
 * Order added events by start and duration
 */
function sortEvents(list) {
  list.sort((a, b) => a.start - b.start || a.duration - b.duration);

  return this;
}

/**
 * Groups added events to intersecting groups
 *
 * @return Array of intersecting events groups
 */
function getIntersections(events) {
  sortEvents(events);

  let
    intersectionList = events.reduce((list, event) => {
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

/**
 * Check event intersection
 */
function areEventsIntersecting(event1, event2) {
  let events = [event1, event2].sort((a, b) => a.start - b.start);

  return events[0].start + events[0].duration > events[1].start;
}
