/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// external packages
import React from 'react';

// config
import defaultConfig from '../../build/atomizer.json';

// actions
import addCustomConfig from '../actions/addCustomConfig';

// stores
import ReferenceStore from '../stores/ReferenceStore';

// mixins
import {FluxibleMixin} from 'fluxible/addons';

/**
 * ConfigBox
 *
 * @class ConfigBox
 * @constructor
 */
var ConfigBox = React.createClass({

    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ReferenceStore]
    },

    getInitialState: function () {
        this.store = this.getStore(ReferenceStore);
        return this.store.getState();
    },

    onChange: function () {
        var state = this.store.getState();
        this.setState(state);
    },

    onConfigChange: function (e) {
        this.executeAction(addCustomConfig, e.target.value);
    },

    populateDefaultConfig: function (e) {
        e.preventDefault();
        this.executeAction(addCustomConfig, JSON.stringify(defaultConfig));
    },

    /**
     * Refer to React documentation render
     *
     * @method render
     * @return {Object} HTML head section
     */
    render: function () {
        var customConfig = this.state.customConfig;
        var hasConfig = !!customConfig;

        return (
            <div className="Mb(50px)">
                <h2 className="Mb(0)"><label htmlFor="customconfig">Custom Configuration:</label></h2>
                <textarea id="customconfig" className="W(100%) P(10px)" rows="10" placeholder="Configuration must be valid JSON" onChange={this.onConfigChange} value={customConfig}></textarea>
                <a href="#" onClick={this.populateDefaultConfig}>Use Example Configuration</a>
            </div>
        );
    }
});

export default ConfigBox;
