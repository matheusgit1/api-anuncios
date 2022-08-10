import { Controller, Get } from '@nestjs/common';

@Controller('/announcement')
export class AnnouncementController {
  @Get("/")
  getA(): string {
    return "this a route of announcement"
  }
}
