const
  React = require('react'),
  EventLayoutService = require("./EventLayoutService");


module.exports = class ScheduleWidget extends React.Component {

  renderGrid() {
    var marks = [...Array(17).keys()]
      .map(i => 9 + i / 2)
      .map(i => Math.floor(i) + ':' + (i % 1 ? '30' : '00'))
      .map(i => <li key={i}>{i}</li>);

    return <ul className="ScheduleWidget-grid">{marks}</ul>;
  }

  renderEvent(event, id, span, offset) {
    var
      colWidth = 200 / span,
      eventStyle = {
        height: event.duration * 2,
        top: event.start * 2,
        width: colWidth + 'px',
        left: colWidth * (span - offset - 1) + 'px',
      };

    return (
      <li key={id} style={eventStyle}>
        {event.title}
      </li>
    );
  }

  renderEvents() {
    var
      id = 1;
      events = [];

    EventLayoutService.getEventsLayout(this.props.events)
      .map(intersectionGroup => {
        intersectionGroup.map((col, offset) => {
          col.map(event => {
            events.push(
              this.renderEvent(event, id++, intersectionGroup.length, offset)
            )
          })
        })
      });

    return (
      <ul className="ScheduleWidget-events">
        {events}
      </ul>
    );
  }

  render() {


    return (
      <div>
        {this.renderGrid()}
        {this.renderEvents()}
      </div>
    );
  }
};
