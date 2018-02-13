import { connect } from 'react-redux';
import * as laneActions from './LaneActions';
import Lane from './Lane';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

import { updateLaneRequest, deleteLaneRequest } from "./LaneActions";
import { createNote, createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
    ...laneActions,
    createLane: createLaneRequest,
    updateLane: updateLaneRequest,
    deleteLane: deleteLaneRequest,
    addNote: createNoteRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lane);