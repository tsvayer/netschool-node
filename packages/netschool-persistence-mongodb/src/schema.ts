import { Schema } from 'mongoose'

export const AssignmentSchema = new Schema({
  aid: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  mark: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})
