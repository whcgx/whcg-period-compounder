'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var polymerElement_js = require('@polymer/polymer/polymer-element.js');

/**
 * `WhcgPeriodCompounder`
 * 
 * @customElement
 * @polymer
 */

class WhcgPeriodCompounder extends polymerElement_js.PolymerElement {
    
    static get properties() {

        return {
            period: {
                type: String,
                notify: true,
                readOnly: false,
            },
            rate: {
                type: String,
                notify: true,
                readOnly: false,
            },
            initialValue: {
                type: String,
                notify: true,
                readOnly: false,
            },
            label: {
                type: String,
                notify: true,
                readOnly: false,
            },
            jsondata: {
                type: String,
                notify: true,
                readOnly: false,
            },
        }
    };

    static get observers() {
        return [
            'multiplier(period, rate, initialValue)',
            'compounder(period, rate, initialValue)'
        ]
    }

    multiplier() {
        console.log(Number(this.period) * Number(this.rate) * Number(this.initialValue));
    };

    compounder() {
        let arr = new Array(this.period).fill(this.initialValue);
        let mappedArr = arr.map((element, index) => {
            return element * Math.pow((1 + this.rate), (index + 1));
        });
        console.log(mappedArr);
        this.jsonBuilder(mappedArr);
    }

    jsonBuilder(mappedArr) {
        let obj = {};
        obj.result = [];

        let labelObj = {};
        labelObj.label = this.label;
        console.log(labelObj);

        
        let keyArr = mappedArr.map((element, index) => {
            return 'year' + (index + 1);
        });

        let valueArr = mappedArr.map((element, index) => {
            return element;
        });

        let valueObj = {};
        keyArr.forEach((key, index) => {
            valueObj[key] = valueArr[index];
        });

        //merging two objects
        let testObj = Object.assign(labelObj, valueObj);

        obj.result[0] = testObj;

        this.jsondata = JSON.stringify(obj);

            // console.log('keyArr');
            // console.log(keyArr);
            // console.log('valueArr');
            // console.log(obj); 
    };
            


    // _multiplyFields() {

    //     let assignednodes = this.$.slotid.assignedNodes();
        

    //     let filteredArr = assignednodes.filter(element => {

    //         return element.nodeName === "WHCG-NUMBER-FIELD";
    //     });
    //     let dataArr = filteredArr.map(element => element.__data);
    //     console.log(dataArr);

    //     let undefinedElement = false;

    //     dataArr.forEach(element => {
    //         if (element === undefined) {
    //             undefinedElement = true;
    //         }
    //     }) 

    //     if (!undefinedElement) {
    //         this.outputString = this.arrayMultiplier(dataArr);
    //         this.jsonBuilder(dataArr);
    //     }
        
    // };

    // jsonBuilder(dataArr) {
    //     let obj = {};
    //     obj.result = [];
    //     obj.result.push({});
    //     dataArr.forEach(element => {
    //         obj.result[0][element.label] = element.value;
    //     });
    //     this.jsondata = JSON.stringify(obj);
    // };

    // arrayMultiplier(arr) {
    //     return arr.reduce((acc, cur) => {
    //         return acc * Number(cur.value);
    //     }, 1);
    // };

   
}

window.customElements.define('whcg-period-compounder', WhcgPeriodCompounder);

exports.WhcgPeriodCompounder = WhcgPeriodCompounder;
