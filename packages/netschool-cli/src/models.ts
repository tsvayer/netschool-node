import { Assignment } from 'netschool-node'
import { Document, Model } from 'mongoose'

export interface AssignmentModel extends Assignment, Document {}
export interface Model {
  Assignment: Model<AssignmentModel>
}
