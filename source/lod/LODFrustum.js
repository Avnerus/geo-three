import {LODRadial} from "./LODRadial";
import {Vector3, Frustum, Matrix4} from "three";

/**
 * Check the planar distance between the nodes center and the view position.
 * 
 * Only subdivides elements inside of the camera frustum.
 *
 * @class LODFrustum
 * @extends {LODRadial}
 */
function LODFrustum()
{
	LODRadial.call(this);

	this.subdivideDistance = 100;

	/**
	 * If true only the central point of the plane geometry will be used
	 * 
	 * Otherwise the object bouding sphere will be tested, providing better results for nodes on frustum edge but will lower performance.
	 * 
	 * @attribute testCenter
	 * @type {boolean}
	 */
	this.testCenter = false;
}

LODFrustum.prototype = Object.create(LODRadial.prototype);

var projection = new Matrix4();
var pov = new Vector3();
var frustum = new Frustum();
var position = new Vector3();

LODFrustum.prototype.updateLOD = function(view, camera, renderer, scene)
{
	projection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
	frustum.setFromProjectionMatrix(projection);
	camera.getWorldPosition(pov);
	
	var self = this;

	view.children[0].traverse(function(node)
	{
		node.getWorldPosition(position);

		var distance = pov.distanceTo(position);
		distance /= Math.pow(2, view.provider.maxZoom - node.level);

		var inFrustum = self.pointOnly ? frustum.containsPoint(position) : frustum.intersectsObject(node);

		if (distance < self.subdivideDistance && inFrustum)
		{
			node.subdivide();
		}
		else if (distance > self.simplifyDistance && node.parentNode)
		{
			node.parentNode.simplify();
		}
	});
};

export {LODFrustum};
