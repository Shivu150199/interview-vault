import Listing from '../models/listing.model.js'
import { errorHandler } from '../utils/error.js'

export const createListing = async (req, res, next) => {
  let detail = req.body
  console.log(detail)
  let newList = new Listing(detail)
  try {
    await newList.save()
    return res.status(201).json('listing is created')
  } catch (error) {
    next(error)
  }
}

export const getListing = async function (req, res, next) {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id })
      return res.status(200).json(listing)
    } catch (err) {
      next(err)
    }
  } else {
    return next(
      errorHandler(400, 'you are not allowed to see other users listing ')
    )
  }
}

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' })
  }
  if (req.user.id !== listing.userRef) {
    return res
      .status(401)
      .json({ message: 'you are not authorised do delete from this list' })
  }
  try {
    await listing.findByIdAndDelete(req.params.id)
  } catch (error) {
    return next(errorHandler(403, 'not authorised'))
  }
}
