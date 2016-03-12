'use strict'

let path = require('path')
let Quark = require('proton-quark')
let _ = require('lodash')

/**
 * @class BootstrapQuark
 * @classdesc This quark is for instance services
 * @author Carlos Marcano
 */
class BootstrapQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  /**
   * @override
   * @method initialize
   * @description Execute all files inside in /bootstrap
   * @author Carlos Marcano
   */
  initialize() {
    _.forEach(this._modules, (m) => _.isFunction(m) ? m() : m)
  }

  /**
   * @method _modules
   * @description
   * @author Carlos Marcano
   * @return {Array} - All modules to execute
   */
  get _modules() {
    const bootstrapPath = path.join(this.proton.app.path, `/bootstrap/${this.proton.enviroment}`)
    return require('require-all')(bootstrapPath)
  }

}

module.exports = BootstrapQuark
