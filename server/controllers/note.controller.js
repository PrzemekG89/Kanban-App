import uuid from 'uuid';
import Lane from '../models/lane';
import Note from '../models/note';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    if (note) {
      Lane.findOne({ notes: note._id }).exec((err, lane) => {
        if (err) {
          res.status(500).send(err);
        }
        lane.notes.pull(note);
        lane.save();
      });

      res.status(200).send(note);
    } else {
      res.status(500).send(err);
    }
  })
}

export function editNoteContent(req, res) {
  const note = req.body;
  if (!note.id || !note.task) {
    res.status(403).end();
  }
  Note.findOneAndUpdate({ id: note.id }, note, { new: true }, (err, updated) => {
    if (err) {
      res.status(500).send('error 500');
    }
    res.json(updated);
  })
}
