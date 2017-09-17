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
  save(request, reply){
    const {position, title, place} = request.payload
    reply({position, title, place})
  }
}
