import { connect } from 'react-redux';
import * as laneActions from './LaneActions';
import Lane from './Lane';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

import { updateLaneRequest, deleteLaneRequest, moveBetweenLanes } from "./LaneActions";
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
    moveBetweenLanes,
};

const noteTarget = {
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const { id: noteId, laneId: sourceLaneId } = sourceProps;

        if (!targetProps.lane.notes.length) {
            targetProps.moveBetweenLanes(
                targetProps.lane.id,
                noteId,
                sourceLaneId,
            );
        }
    },
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
        connectDropTarget: dragConnect.dropTarget()
    }))
)(Lane);