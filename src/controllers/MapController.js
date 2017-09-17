/* eslint-disable class-methods-use-this */
import Controller from './Controller'

/**
 * @class
 * @extends Controller
 */
export default class MapController extends Controller{
  /**
   *
   * @param {{}} request
   * @param {Function} reply
   */
  index(request, reply){
    const {center, type, search, viewBox} = request.payload
    // if search
    // find %search%
    //    if fined documents length > 20
    //    get by lat between viewBox left ~ viewBox right (세로)
    //    get by lng between viewBox top ~ viewBox bottom 가로
    // else
    // get by lat between viewBox left ~ viewBox right (세로)
    // get by lng between viewBox top ~ viewBox bottom
    reply({center, type, search})
  }
  /**
   *
   * @param {{}} request
   * @param {Function} reply
   */
  create(request, reply){
    const {role, email} = request.headers
    const {position, title, place} = request.payload
    reply({position, title, place, role, email})
  }

  /**
   *
   * @param {{}} request
   * @param {Function} reply
   */
  update(request, reply){
    const {email} = request.headers
    const {id, position, title, place} = request.payload
    reply({id, position, title, place, email})
  }

  /**
   *
   * @param {{}} request
   * @param {Function} reply
   */
  delete(request, reply){
    const {email} = request.headers
    const {id} = request.payload
    reply({id, email})
  }
}
