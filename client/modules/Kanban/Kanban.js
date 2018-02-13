import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
//import { createLane } from '../Lane/LaneActions';
import { fetchLanes } from '../Lane/LaneActions';
import { createLaneRequest } from '../Lane/LaneActions';

class Kanban extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchLanes();
  }

  render() {
    return (
      <div className={styles.KanbanContainer}>
        <button
          className={styles.AddLane}
          onClick={() => this.props.createLane({
            name: 'New lane',
          })}
        >Add lane</button>
        <div className={styles.FlexContainer}>
          <Lanes lanes={this.props.lanes} />
        </div>
      </div>
    )
  }
}

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  lanes: Object.values(state.lanes),
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
  fetchLanes: fetchLanes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
