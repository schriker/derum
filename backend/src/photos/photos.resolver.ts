import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Photo } from './entities/photo.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { PhotosService } from './photos.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UsersService } from 'src/users/services/users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Action } from 'src/casl/action.enum';
import { UsersProfileService } from 'src/users/services/users-profile.service';

@Resolver(() => Photo)
export class PhotosResolver {
  constructor(
    private photosService: PhotosService,
    private usersService: UsersService,
    private usersProfileService: UsersProfileService,
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
    const user = await this.usersService.getByIdBasic(session.id);
    const room = await this.roomsService.findOneById(roomId);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, room)) throw new ForbiddenException();
    if (room.photo) {
      await this.photosService.deletePhoto(room.photo);
    }
    const photo = await this.photosService.savePhoto(
      attachment,
      session,
      'room',
      200,
      200,
    );
    this.roomsService.updatePhoto(photo, roomId);
    return photo;
  }

  @Mutation(() => Photo)
  @UseGuards(GQLSessionGuard)
  async uploadUserPhoto(
    @CurrentUser() session: User,
    @Args('attachment', { type: () => GraphQLUpload })
    attachment: FileUpload,
    @Context() ctx,
  ): Promise<Photo> {
    const user = await this.usersService.getByIdBasic(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, user)) throw new ForbiddenException();
    if (user.photo) {
      await this.photosService.deletePhoto(user.photo);
    }
    const photo = await this.photosService.savePhoto(
      attachment,
      session,
      'user',
      200,
      200,
    );
    this.usersProfileService.updatePhoto(photo, user);
    this.usersService.updateSession(ctx, {
      ...user,
      photo,
    });
    return photo;
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async deletePhoto(
    @CurrentUser() session: User,
    @Args('photoId', { type: () => Int }) photoId: number,
    @Context() ctx,
  ) {
    const user = await this.usersService.getByIdBasic(session.id);
    const photo = await this.photosService.findOneById(photoId);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, photo)) throw new ForbiddenException();
    this.photosService.deletePhoto(photo);
    this.usersService.updateSession(ctx, {
      ...user,
      photo: null,
    });
    return true;
  }
}
