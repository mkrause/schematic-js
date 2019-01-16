
import * as Lang from './lang/Model.js';
import ModelInterface from './lang/Model.js';

import Model from './lang/constructors/Model.js';
import Unit from './lang/constructors/Unit.js';
import Textual from './lang/constructors/Textual.js';
import Text from './lang/constructors/Text.js';


const m = {
    Model: Lang.Model,
    
    Constructor: {
        Model,
        Unit,
        Textual,
        Text,
    },
    
    // Shorthands
    model: new Model(),
    unit: new Unit(),
    text: new Textual(),
};

export default m;
