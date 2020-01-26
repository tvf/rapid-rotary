// import { vec2 } from 'gl-matrix';

main();

interface XYCTable {
  x: number;
  y: number;
  theta: number;
}

function draw_reachable_zone(
  ctx: CanvasRenderingContext2D,
  point: { x: number; y: number },
  time: number,
  angular_velocity: number,
) {
  const point_r = Math.sqrt(point.x * point.x + point.y * point.y);
  const point_theta = Math.atan2(point.y, point.x);

  ctx.beginPath();

  const theta_ccw = point_theta + angular_velocity * time;
  const theta_cw = point_theta - angular_velocity * time;

  ctx.arc(0, 0, point_r + time, theta_cw, theta_ccw, false);

  ctx.arc(
    point_r * Math.cos(theta_ccw),
    point_r * Math.sin(theta_ccw),
    time,
    theta_ccw,
    theta_ccw + Math.PI,
    false,
  );

  if (point_r - time > 0) {
    ctx.arc(0, 0, point_r - time, theta_ccw, theta_cw, true);
  }

  ctx.arc(
    point_r * Math.cos(theta_cw),
    point_r * Math.sin(theta_cw),
    time,
    theta_cw - Math.PI,
    theta_cw,
    false,
  );
}

function paint_table(ctx: CanvasRenderingContext2D, table: XYCTable) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, 480, 480);

  ctx.translate(240, 240);
  ctx.scale(200, -200);

  let t = 1;
  let toggle = true;
  while (t > 0) {
    ctx.fillStyle = `rgb(${toggle ? 255 : 0}, 0, 0)`;
    draw_reachable_zone(ctx, { x: 0.3, y: 0.3 }, t, Math.PI);
    ctx.fill();
    t -= 0.05;
    toggle = !toggle;
  }

  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, 2 * Math.PI, true);
  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.lineWidth = 0.01;
  ctx.stroke();

  // ctx.lineWidth = draw_radius;
  // draw_robot_arm(ctx, vec2.fromValues(-0.5, 0), table.alpha);
  // draw_robot_arm(ctx, vec2.fromValues(0.5, 0), table.alpha_prime);
}

function main() {
  const table_state = {
    theta: 0,
    x: 20,
    y: 10,
  };

  const simulation_canvas: HTMLCanvasElement = document.getElementById(
    'simulation',
  ) as HTMLCanvasElement;
  const simulation_ctx = simulation_canvas.getContext('2d');

  paint_table(simulation_ctx, table_state);

  simulation_canvas.addEventListener('mousemove', e => {
    const rect = simulation_canvas.getBoundingClientRect();
    // const mousepoint =
    // drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    // x = e.clientX - rect.left;
    // y = e.clientY - rect.top;
  });
}
