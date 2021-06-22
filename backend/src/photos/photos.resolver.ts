import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Photo } from './entities/photo.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { GQLSessionGuard } from 'src/common/guards/session-gql-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { PhotosService } from './photos.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Action } from 'src/casl/action.enum';

@Resolver(() => Photo)
export class PhotosResolver {
  constructor(
    private photosService: PhotosService,
    private usersService: UsersService,
    private roomsService: RoomsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Mutation(() => Photo)
  @UseGuards(GQLSessionGuard)
  async uploadRoomPhoto(
    @CurrentUser() session: User,
    @Args('roomId', { type: () => Int })
    roomId: number,
    @Args('attachment', { type: () => GraphQLUpload })
    attachment: FileUpload,
  ): Promise<Photo> {
    const user = await this.usersService.getById(session.id);
    const room = await this.roomsService.findOneById(roomId);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, room)) throw new ForbiddenException();
    const photo = await this.photosService.saveRoomPhoto(
      attachment,
      roomId,
      session,
    );
    this.roomsService.updatePhoto(photo, roomId);
    return photo;
  }
}
