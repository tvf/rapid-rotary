import { vec2 } from 'gl-matrix';

main();

function paint_c_space(ctx: CanvasRenderingContext2D): void {
  for (let i = 0; i < 360; ++i) {
    for (let j = 0; j < 360; ++j) {
      const alpha = (Math.PI * i) / 180;
      const alpha_prime = (Math.PI * j) / 180;

      const elbow = [Math.cos(alpha) - 0.5, Math.sin(alpha)];
      const elbow_prime = [Math.cos(alpha_prime) + 0.5, Math.sin(alpha_prime)];

      if (vec2.distance(elbow, elbow_prime) > 1.9) {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

function draw_robot_arm(
  ctx: CanvasRenderingContext2D,
  origin: vec2,
  angle: number,
) {
  let transform = ctx.getTransform();

  ctx.translate(origin[0], origin[1]);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(1, 0);
  ctx.stroke();

  ctx.setTransform(transform);
}

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

  ctx.fill();
}

function paint_table(ctx: CanvasRenderingContext2D, table: XYCTable) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, 480, 480);

  ctx.translate(240, 240);
  ctx.scale(200, -200);

  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, 2 * Math.PI, true);
  ctx.fillStyle = 'rgb(127, 127, 127)';
  ctx.lineWidth = 0.01;
  ctx.stroke();

  let t = 0.5;
  while (t > 0) {
    ctx.fillStyle = `rgba(${(1 - t) * 255}, 0, 0, 0.1)`;
    draw_reachable_zone(ctx, { x: 0.3, y: 0.3 }, t, Math.PI);
    t -= 0.05;
  }

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
    // drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    // x = e.clientX - rect.left;
    // y = e.clientY - rect.top;
  });
}
