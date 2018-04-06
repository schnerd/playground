import React from 'react';
import {Card, CardMedia, CardContent, CardFloatingMedia} from 'card';
import {Text, Paragraph, Button, Link, Arrow} from 'other';

export default class DatePickerUsage {
  renderSimpleProps() {
    // Prop-based API, multiple top-level components. Superfine-esque.
    // DatePicker, DateRangePicker, DateCalendar, DateRangeCalendar
    return (
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      />
    );
  }

  renderComposable1() {
    // Unclear how popover gets triggered? Intended order of internals also unclear.
    // State/props would likely need to be passed down via context, which might make internals less reusable
    // since they depend on a context wrapper
    return (
      <DatePicker>
        <DateInput name="start">
        </DateInput>
        <DateInput name="middle">
        </DateInput>
        <DateInput name="end">
        </DateInput>
        <DatePopover>
          <DateCalendarStart />
          <DateCalendarEnd />
          <DatesQuickSelect />
        </DatePopover>
      </DatePicker>
    );
  }

  renderChildAsFunction() {
    // Using a child-as-function
    // Kind of a complicated API for a default datepicker
    // Again, intended order is unclear, feels like a lot of prop passing (or requires context)
    return (
      <DatePickerContainer dateFormat="m/d/YYYY">
        {(props) => (
          <div>
            <DateRangeInputs {...props}/>
            <DateRangePopover {...props}>
              <DateRangeCalendar {...props}/>
              <DateRangeQuickSelect {...props}/>
            </DateRangePopover>
          </div>
        )}
      </DatePickerContainer>
    );
  }

  renderComponentInjection() {
    // Try adding a Quick Range into the datepicker via ComponentInjection
    // Seems to work pretty well, not overly complicated, simple API
    function DatePopoverBody(props) {
      return [
        <div>
          <DateRangeCalendar {...props} />
          <div>
            <h2>Quick Select</h2>
            <Button onClick={() => props.setDates(pastDay())}>Past Day</Button>
            <Button onClick={() => props.setDates(pastWeek())}>Past Week</Button>
            <Button onClick={() => props.setDates(pastMonth())}>Past Month</Button>
            <Button onClick={() => props.setDates(past3Month())}>Past 3 Months</Button>
            <Button onClick={() => props.setDates(past6Month())}>Past 6 Months</Button>
            <Button onClick={() => props.setDates(pastYear())}>Past Year</Button>
          </div>
        </div>
      ];
    }

    return (
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        components={{
          DatePopoverBody
        }}
      />
    );
  }

}
