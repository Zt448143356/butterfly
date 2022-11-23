import _ from 'lodash';

export default (canvas) => {
  if (!canvas) {
    return;
  }

  canvas.recalc = function () {
    this.nodes.forEach(node => {
      node.endpoints.forEach(p => {
        if (!_.isFunction(p.updatePos)) {
          return;
        }
        p.updatePos();
      });
    });

    this.edges.forEach(e => {
      if (!_.isFunction(e.redraw)) {
        return;
      }
      e.redraw();
    });

    this.groups.forEach(group => {
      if (!_.isFunction(group.updatePos)) {
        return;
      }
      group.updatePos();
      if (!_.isFunction(group.redraw)) {
        return;
      }
      group.redraw();
    });
  };

  canvas.recalc();
};
